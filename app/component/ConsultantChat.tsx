"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  CircleHelp,
  LoaderCircle,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { CONSULTANT_PRICING } from "../config/consultant-pricing";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const WELCOME_KEY = "onyx-consultant-welcome-dismissed-v1";
const WELCOME_TEXT =
  "Hi, welcome to OnyxTech! I’m your AI project consultant. Tell me what you’re building—even if it’s just an idea—and I’ll help you shape the website or digital product, explore design directions, and understand a rough budget. What would you like to create?";

const STARTERS = [
  "I have a business idea. What kind of website should I start with?",
  "What features would help my customers?",
  "Can you suggest a visual direction for my brand?",
  "What might a project like this cost?",
];

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CONSULTANT_PRICING.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ConsultantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showBudget, setShowBudget] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    try {
      setShowWelcome(window.localStorage.getItem(WELCOME_KEY) !== "dismissed");
    } catch {
      setShowWelcome(true);
    }
  }, []);

  const dismissWelcome = useCallback(() => {
    setShowWelcome(false);
    try {
      window.localStorage.setItem(WELCOME_KEY, "dismissed");
    } catch {
      // The greeting remains dismissible when storage is unavailable.
    }
  }, []);

  const openChat = useCallback(() => {
    dismissWelcome();
    setIsOpen(true);
  }, [dismissWelcome]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isOpen, messages, error, isLoading]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const sendMessage = useCallback(async (rawContent: string) => {
    const content = rawContent.trim();
    if (!content || isLoading || content.length > 1800) return;

    const userMessage: ChatMessage = {
      id: ++nextId.current,
      role: "user",
      content,
    };
    const assistantId = ++nextId.current;
    const nextMessages = [...messages, userMessage];
    setMessages([
      ...nextMessages,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setDraft("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(-12).map(({ role, content: text }) => ({
            role,
            content: text,
          })),
        }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { message?: string };
        setMessages((current) => current.filter((message) => message.id !== assistantId));
        setError(result.message || "The consultant could not respond. Please try again later.");
        return;
      }

      if (!response.body) {
        setMessages((current) => current.filter((message) => message.id !== assistantId));
        setError("The consultant returned an empty response. Please try again.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      const processEvent = (eventText: string) => {
        const data = eventText
          .split("\n")
          .filter((line) => line.startsWith("data:"))
          .map((line) => line.slice(5).trim())
          .join("\n");
        if (!data || data === "[DONE]") return;
        try {
          const event = JSON.parse(data) as {
            choices?: Array<{ delta?: { content?: string | Array<{ text?: string }> } }>;
            error?: { message?: string };
          };
          if (event.error?.message) throw new Error(event.error.message);
          const delta = event.choices?.[0]?.delta?.content;
          const chunk = typeof delta === "string"
            ? delta
            : Array.isArray(delta)
              ? delta.map((part) => part.text ?? "").join("")
              : "";
          if (chunk) {
            fullText += chunk;
            setMessages((current) =>
              current.map((message) =>
                message.id === assistantId ? { ...message, content: fullText } : message,
              ),
            );
          }
        } catch (parseError) {
          if (parseError instanceof Error && parseError.message !== "Unexpected end of JSON input") {
            throw parseError;
          }
        }
      };

      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";
        for (const eventText of events) processEvent(eventText);
        if (done) break;
      }
      if (buffer.trim()) processEvent(buffer);

      if (!fullText.trim()) {
        setMessages((current) => current.filter((message) => message.id !== assistantId));
        setError("The consultant returned an empty response. Please try again.");
      }
    } catch {
      setMessages((current) => current.filter((message) => message.id !== assistantId));
      setError("We couldn’t reach the consultant service. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  const prepareInquiry = useCallback(() => {
    const notes = messages
      .filter((message) => message.role === "user")
      .slice(-5)
      .map((message) => message.content);
    if (notes.length === 0) return;

    const summary =
      "Project notes shared in the OnyxTech consultant chat:\n\n" +
      notes.map((note) => "- " + note).join("\n");
    window.dispatchEvent(
      new CustomEvent("onyx:open-inquiry", { detail: { summary } }),
    );
    setIsOpen(false);
  }, [messages]);

  const userHasSharedNotes = messages.some((message) => message.role === "user");

  return (
    <>
      {showWelcome && !isOpen && (
        <aside className="onyx-welcome" aria-label="OnyxTech consultant welcome">
          <button
            type="button"
            className="onyx-welcome-dismiss"
            aria-label="Dismiss welcome message"
            onClick={dismissWelcome}
          >
            <X size={15} aria-hidden="true" />
          </button>
          <span className="onyx-welcome-kicker"><Sparkles size={13} aria-hidden="true" /> ONYXTECH CONSULTANT</span>
          <p>{WELCOME_TEXT}</p>
          <button type="button" className="onyx-welcome-open" onClick={openChat}>
            Start a conversation <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </aside>
      )}

      {isOpen && (
        <section
          id="onyx-consultant-panel"
          className="onyx-chat-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="onyx-chat-title"
        >
          <header className="onyx-chat-header">
            <div className="onyx-chat-brandmark" aria-hidden="true">
              <Bot size={23} />
            </div>
            <div className="onyx-chat-heading">
              <h2 id="onyx-chat-title">OnyxTech Consultant</h2>
              <p>Project discovery · Powered by Groq</p>
            </div>
            <button
              type="button"
              className="onyx-chat-icon-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close consultant chat"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </header>

          <div className="onyx-chat-notice" role="note">
            <span className="onyx-status-dot" />
            AI-assisted project planning. Avoid sharing sensitive or confidential information.
          </div>

          <div className="onyx-chat-messages" aria-live="polite" aria-relevant="additions text">
            {messages.length === 0 ? (
              <div className="onyx-chat-empty">
                <div className="onyx-chat-orb" aria-hidden="true"><Sparkles size={25} /></div>
                <h3>Let’s shape your next idea.</h3>
                <p>Share what you want to build. You can start with one of these prompts.</p>
                <div className="onyx-starter-list">
                  {STARTERS.map((starter) => (
                    <button
                      type="button"
                      key={starter}
                      className="onyx-starter-button"
                      onClick={() => void sendMessage(starter)}
                      disabled={isLoading}
                    >
                      {starter}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="onyx-message-list">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={message.role === "user" ? "onyx-message onyx-message-user" : "onyx-message onyx-message-assistant"}
                  >
                    {message.role === "assistant" && <span className="onyx-message-avatar"><Bot size={14} aria-hidden="true" /></span>}
                    <p>{message.content}</p>
                  </article>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="onyx-chat-loading" role="status">
                <LoaderCircle size={16} className="onyx-spin" aria-hidden="true" />
                OnyxTech is thinking…
              </div>
            )}
            {error && (
              <div className="onyx-chat-error" role="alert">
                <CircleHelp size={17} aria-hidden="true" />
                <p>{error}</p>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          <div className="onyx-chat-tools">
            <button
              type="button"
              className="onyx-budget-toggle"
              aria-expanded={showBudget}
              onClick={() => setShowBudget((value) => !value)}
            >
              <span>Illustrative budget ranges</span>
              <ChevronDown size={15} className={showBudget ? "onyx-chevron-open" : ""} aria-hidden="true" />
            </button>
            {showBudget && (
              <div className="onyx-budget-list">
                <p className="onyx-budget-disclaimer">
                  Draft examples only · owner review required · not confirmed OnyxTech prices or a quote.
                </p>
                {CONSULTANT_PRICING.ranges.map((range) => (
                  <div className="onyx-budget-row" key={range.id}>
                    <span>{range.label}</span>
                    <strong>
                      {formatAmount(range.min)}–{formatAmount(range.max)}{ "plus" in range && range.plus ? "+" : ""}
                    </strong>
                  </div>
                ))}
                <p className="onyx-budget-footnote">
                  Actual costs depend on scope, integrations, content, design, timeline, and other requirements. A suitable range should only be selected after discovery.
                </p>
              </div>
            )}
          </div>

          {userHasSharedNotes && (
            <div className="onyx-chat-handoff">
              <button type="button" onClick={prepareInquiry}>
                Prepare project inquiry <ArrowUpRight size={15} aria-hidden="true" />
              </button>
              <span>Your notes will be placed in the existing form for you to review. Nothing is sent automatically.</span>
            </div>
          )}

          <form
            className="onyx-chat-composer"
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage(draft);
            }}
          >
            <label className="sr-only" htmlFor="onyx-consultant-message">Your project message</label>
            <textarea
              ref={inputRef}
              id="onyx-consultant-message"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Tell us what you’re thinking about…"
              rows={1}
              maxLength={1800}
              disabled={isLoading}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void sendMessage(draft);
                }
              }}
            />
            <button
              type="submit"
              className="onyx-chat-send"
              aria-label="Send message"
              disabled={!draft.trim() || isLoading}
            >
              {isLoading ? <LoaderCircle size={17} className="onyx-spin" /> : <Send size={17} />}
            </button>
          </form>
          <p className="onyx-chat-privacy">
            Messages are kept in this tab only by this site and sent to Groq to generate replies. Avoid sharing sensitive information. Provider data handling is subject to Groq’s terms.
          </p>
        </section>
      )}

      <button
        type="button"
        className="onyx-chat-launcher"
        onClick={() => (isOpen ? setIsOpen(false) : openChat())}
        aria-label={isOpen ? "Close OnyxTech consultant" : "Open OnyxTech consultant"}
        aria-expanded={isOpen}
        aria-controls="onyx-consultant-panel"
      >
        {isOpen ? <X size={22} aria-hidden="true" /> : <MessageCircle size={22} aria-hidden="true" />}
        {!isOpen && <span>Let’s talk</span>}
        <span className="onyx-launcher-orbit" aria-hidden="true" />
      </button>
    </>
  );
}
