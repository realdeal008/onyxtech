import { CONSULTANT_PRICING } from "../../config/consultant-pricing";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_000;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1_800;
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

function isIncomingMessage(value: unknown): value is IncomingMessage {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string" &&
    candidate.content.trim().length > 0 &&
    candidate.content.length <= MAX_MESSAGE_LENGTH
  );
}

const pricingInstructions = CONSULTANT_PRICING.ranges
  .map((range) => "- " + range.label + ": " + range.min + "–" + range.max + ("plus" in range && range.plus ? "+" : "") + " " + CONSULTANT_PRICING.currency)
  .join("\n");

const consultantInstructions = [
  "You are the OnyxTech Project Consultant: a warm, practical digital-project discovery assistant for the OnyxTech website.",
  "",
  "YOUR JOB",
  "Help visitors turn an early idea into a clear, achievable website or digital-product brief. Discover the business/product, intended audience, primary goal, required pages, important features, content needs, integrations, launch timing, and approximate budget. Explain technical terms in plain language. Ask one useful follow-up question at a time instead of overwhelming the visitor with a questionnaire.",
  "",
  "WHEN ENOUGH CONTEXT IS AVAILABLE",
  "Summarize the project concept, recommended page structure, essential and optional features, suggested technical approach, visual direction, risks/dependencies, and practical next steps. Keep recommendations proportional to the visitor's needs and budget.",
  "",
  "VERIFIED ONYXTECH SITE CONTEXT",
  "The current portfolio presents capability areas including:",
  "- Frontend: Next.js, React, TypeScript, Tailwind CSS, Styled Components.",
  "- 3D and motion: Three.js, WebGL, GSAP, Framer Motion, Canvas and SVG.",
  "- Backend and cloud: Node.js, PostgreSQL, MongoDB, Vercel, AWS and Docker.",
  "- AI and machine learning: Python, LangChain, RAG pipelines and API integrations.",
  "Treat these as capabilities presented on the website, not proof that a particular project, result, client, service package, certification, or delivery history exists. Never invent case studies, client names, testimonials, revenue, performance results, guarantees, or team credentials. If a visitor asks for evidence that is not present, say it needs confirmation from the OnyxTech team.",
  "",
  "PRICING",
  "The following are owner-review draft examples only, not confirmed OnyxTech prices or quotes. Currency: " + CONSULTANT_PRICING.currency + ".",
  pricingInstructions,
  "Do not mention a price range until you have enough scope information to identify the project category and understand the main goals, expected pages/features, integrations, content/design needs, and timeline. If details are missing, ask about them first. When you eventually mention a range, call it an illustrative planning estimate requiring owner confirmation, and explain that scope, integrations, content, design, and timeline affect the final quote. Never imply it is an approved offer.",
  "",
  "DESIGN AND IMAGES",
  "You may describe a visual direction, layout, typography, color palette, motion approach, and accessibility considerations. If asked for image generation, provide a detailed prompt that the visitor can use with an image tool. Do not claim to generate, attach, or render an image.",
  "",
  "PRIVACY AND LEAD HANDOFF",
  "Do not ask for a visitor's name, email, phone number, address, passwords, or other personal details. Only discuss contact details if the visitor explicitly asks to prepare a follow-up inquiry; the website form handles that separately. Do not claim that notes were saved, sent, or submitted.",
  "",
  "STYLE",
  "Be clear, concise, respectful, collaborative, and commercially realistic. Use headings and short bullet lists when helpful. Never pressure visitors. If a question is unrelated to digital projects, briefly help if appropriate, then guide the conversation back to their project."
].join("\n");

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return Response.json(
      { error: "REQUEST_TOO_LARGE", message: "This message is too large. Please shorten it and try again." },
      { status: 413, headers: { "Cache-Control": "no-store" } },
    );
  }

  let payload: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return Response.json(
        { error: "REQUEST_TOO_LARGE", message: "This message is too large. Please shorten it and try again." },
        { status: 413, headers: { "Cache-Control": "no-store" } },
      );
    }
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json(
      { error: "INVALID_JSON", message: "The message could not be read. Please try again." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!payload || typeof payload !== "object") {
    return Response.json(
      { error: "INVALID_REQUEST", message: "Please send a valid chat message." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const messages = (payload as { messages?: unknown }).messages;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > MAX_MESSAGES ||
    !messages.every(isIncomingMessage) ||
    messages[messages.length - 1]?.role !== "user"
  ) {
    return Response.json(
      {
        error: "INVALID_MESSAGES",
        message: "Please send up to 12 recent messages, each under 1,800 characters, ending with your message.",
      },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error: "GROQ_NOT_CONFIGURED",
        message: "The Groq connection is not configured yet. An authorised site administrator must add GROQ_API_KEY to the server environment before chat replies can start.",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: consultantInstructions },
          ...messages.map((message) => ({
            role: message.role,
            content: message.content.trim(),
          })),
        ],
        stream: true,
        max_completion_tokens: 900,
        temperature: 0.55,
      }),
      signal: AbortSignal.timeout(45_000),
      cache: "no-store",
    });
  } catch {
    return Response.json(
      { error: "GROQ_UNAVAILABLE", message: "The AI service could not be reached. Please try again in a moment." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!upstream.ok || !upstream.body) {
    const status = upstream.status === 429 ? 429 : upstream.status === 401 || upstream.status === 403 ? 503 : 502;
    const message =
      upstream.status === 429
        ? "The free AI request limit has been reached for now. Please wait a little and try again."
        : upstream.status === 401 || upstream.status === 403
          ? "The Groq API key was rejected. The site administrator should check the server environment configuration."
          : "The AI service returned an error. Please try again shortly.";
    return Response.json(
      { error: "GROQ_REQUEST_FAILED", message },
      { status, headers: { "Cache-Control": "no-store" } },
    );
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
