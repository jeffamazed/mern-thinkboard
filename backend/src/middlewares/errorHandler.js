import CustomAPIError from "../classes/CustomApiError.js";

const errorHandler = (err, req, res, next) => {
  if (err.isJoi) {
    const message = err.details.map((e) => {
      const msg = e.message.replace(/\"/g, "");
      const formattedMsg = msg.slice(0, 1).toUpperCase() + msg.slice(1) + ".";
      return formattedMsg;
    });

    console.warn("Joi error", message);
    return res.status(400).json({ success: false, message });
  }

  if (err.name === "CastError") {
    console.warn(err.message);
    const message = `Note with id ${err.value} is invalid.`;

    return res.status(400).json({ success: false, message });
  }

  if (err instanceof CustomAPIError) {
    console.warn(err.logMessage);
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  // fallback
  console.error(err);
  return res.status(500).json({
    success: false,
    message: "Interal server error.",
  });
};

export default errorHandler;
