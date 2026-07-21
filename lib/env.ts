import { z } from "zod";

/**
 * Server-side environment variables.
 * Every route that depends on one of these should import `env`
 * from this file instead of reading `process.env` directly, so
 * misconfiguration fails fast with a clear message instead of a
 * silent undefined deep in a request handler.
 */
const serverSchema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_EMAIL_TO: z.string().email().optional(),
  CONTACT_EMAIL_FROM: z.string().min(1).optional(),
  GEMINI_API_KEY: z.string().min(1).optional(),
  GEMINI_MODEL: z.string().default("gemini-2.5-flash"),
  GITHUB_USERNAME: z.string().min(1).optional(),
  GITHUB_TOKEN: z.string().min(1).optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

function loadServerEnv() {
  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error(
      "Invalid server environment variables:",
      parsed.error.flatten().fieldErrors
    );
    // We intentionally don't throw here — many of these are optional
    // integrations (email, AI, GitHub, rate limiting). Each feature
    // checks for its own required keys at call time and degrades
    // gracefully if they're missing.
  }
  return parsed.success ? parsed.data : (process.env as never);
}

function loadClientEnv() {
  const parsed = clientSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  });
  if (!parsed.success) {
    throw new Error("Invalid client environment variables");
  }
  return parsed.data;
}

export const env = loadServerEnv();
export const clientEnv = loadClientEnv();
