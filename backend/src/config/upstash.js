import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// create a rateLimiter that allows 100 requests per minute
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default rateLimit;
