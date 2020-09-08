"use strict";
const convict = require("convict");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

convict.addFormat(require("convict-format-with-validator").url);

const config = convict({
  NODE_ENV: {
    doc: "Node Env",
    default: process.env.NODE_ENV,
    env: "NODE_ENV",
  },
  PORT: {
    doc: "The port to bind.",
    format: "port",
    default: 3000,
    env: "PORT",
  },
  DB_URL: {
    doc: "Mongodb url",
    env: "DB_URL",
    default: "mongodb://localhost/buildforsdg",
  },
  APP_KEY: {
    doc: "Application Encryption key",
    env: "APP_KEY",
    default: "sudhfhefui3brijkdsbfsdfuefuwi3kjbehdsjkfbsdf",
  },
});

config.validate({ allowed: "strict" });

module.exports = config;
