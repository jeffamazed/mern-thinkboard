import CustomAPIError from "../classes/CustomApiError.js";
import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  const { success } = await rateLimit.limit("my-limit-key");
  if (!success) {
    throw new CustomAPIError(
      "Too many requests.",
      429,
      `Too many requests on ${req.url} from ${req.ip}!`
    );
  }

  next();
};
export default rateLimiter;
