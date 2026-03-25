import { sendToSolarWinds } from "../config/solarwinds.js";

const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const logEntry = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${Date.now() - startTime}ms`,
      timestamp: new Date().toISOString(),
    };

    console.log(
      `[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - ${logEntry.statusCode} (${logEntry.duration})`
    );

    sendToSolarWinds(logEntry);
  });

  next();
};

export default loggerMiddleware;