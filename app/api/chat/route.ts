import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { env } from "@/lib/env";
import { chatSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { AI_ASSISTANT_SYSTEM_PROMPT } from "@/constants/data";

// Node.js runtime (not edge) — the Google GenAI SDK isn't guaranteed to be
// edge-compatible, and this route doesn't need edge's low-latency benefits.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await checkRateLimit(`chat:${ip}`);
  if (!success) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please slow down." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!env.GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "The AI assistant isn't configured yet — add GEMINI_API_KEY to enable it.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = await req.json();
  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: "Invalid request." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

  // Gemini uses "model" instead of "assistant" for the AI's turns, and
  // expects each turn as { role, parts: [{ text }] }.
  const contents = parsed.data.messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const stream = await ai.models.generateContentStream({
      model: env.GEMINI_MODEL,
      contents,
      config: {
        systemInstruction: AI_ASSISTANT_SYSTEM_PROMPT,
        temperature: 0.6,
        maxOutputTokens: 1024,
        // Gemini's Flash models "think" before answering by default, and
        // those thinking tokens count against maxOutputTokens — on a short
        // Q&A chatbot like this, that was silently eating most of the
        // budget and cutting the visible reply off mid-sentence. This is
        // a simple lookup/conversational task, not multi-step reasoning,
        // so thinking is switched off entirely.
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Chat route error:", err);
    return new Response(
      JSON.stringify({ error: "The assistant is unavailable right now." }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
