import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// IP制限
export const ipRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 d"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

// 2. グローバル制限
export const globalRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(15, "1 d"), // Resendの上限より低く
  analytics: true,
  prefix: "@upstash/ratelimit/global",
});

const BLOCKED_IPS = [
  "5.254.26.60",
  "172.111.204.5",
  "110.167.122.2",
  "8.219.129.31",
  "70.166.167.55",
];

// 3. 特定IPをブロック
export function isBlockedIP(ip: string): boolean {
  return BLOCKED_IPS.includes(ip);
}
