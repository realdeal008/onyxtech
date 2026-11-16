const MAX_BODY_BYTES = 16_000;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1_800;

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
    !messages.every(isIncomingMessage)
  ) {
    return Response.json(
      {
        error: "INVALID_MESSAGES",
        message: "Please send up to 12 recent messages, each under 1,800 characters.",
      },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  // Deliberately no model call here: the repository has no configured AI provider,
  // provider SDK, or server-side credentials. Do not silently incur usage.
  return Response.json(
    {
      error: "AI_PROVIDER_NOT_CONFIGURED",
      message:
        "The OnyxTech chat interface is ready, but its AI provider has not been connected. No message was sent to an AI service. OnyxTech must first choose a provider and model, then add its API key as a server-only deployment environment variable.",
    },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}
