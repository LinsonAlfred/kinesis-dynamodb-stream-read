const envalid = require("envalid");

const { str, json } = envalid;

const env = envalid.cleanEnv(process.env, {
  AWS_CONFIG: json({
    default: {
      REGION: "ap-southeast-1",
      ACCESS_KEY_ID: "xxxxx",
      SECRET_ACCESS_KEY: "xxxxxx",
    },
  }),
  KINESIS_STREAM_NAME: str({ default: "product-stream-receiver" }),
  EVENT_NAMES_TO_SKIP: json({ default: ["REMOVE"] }),
  FIELDS_TO_SKIP: json({ default: ["metadata"] }),
  LOG_LEVEL: str({ default: "debug" }),
});

module.exports = env;
