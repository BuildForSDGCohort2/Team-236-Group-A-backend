"use strict";
const pino = require("pino");

const pinoLogger = pino({
  name: "Api",
  redact: ["access_token", "token", "password", "secret", "pin"],
});

const logger = (name) => {
  const loggerInstance = name ? pinoLogger.child({ type: name }) : pinoLogger;

  return loggerInstance;
};

module.exports = logger;
