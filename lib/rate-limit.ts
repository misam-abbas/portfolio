import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/lib/env";

let ratelimit: Ratelimit | null = null;

function getRatelimiter() {
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis: new Redis({
        url: env.UPSTASH_REDIS_REST_URL,
        token: env.UPSTASH_REDIS_REST_TOKEN,
      }),
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: true,
      prefix: "portfolio",
    });
  }
  return ratelimit;
}

/**
 * Returns { success: true } when the request should proceed.
 * If Upstash isn't configured, rate limiting is skipped rather than
 * blocking requests — configure UPSTASH_REDIS_REST_URL/TOKEN in
 * production to enforce real limits.
 */
export async function checkRateLimit(identifier: string) {
  const limiter = getRatelimiter();
  if (!limiter) return { success: true, limit: 0, remaining: 0 };
  return limiter.limit(identifier);
}
