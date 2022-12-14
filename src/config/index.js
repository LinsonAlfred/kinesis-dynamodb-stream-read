const env = require('./env');

const EVENT_NAMES_TO_SKIP = env.EVENT_NAMES_TO_SKIP;
const FIELDS_TO_SKIP = env.FIELDS_TO_SKIP;

const AWS_CONFIG = env.AWS_CONFIG;

const KINESIS_STREAM_NAME = env.KINESIS_STREAM_NAME;

module.exports = {
  EVENT_NAMES_TO_SKIP,
  FIELDS_TO_SKIP,
  AWS_CONFIG,
  KINESIS_STREAM_NAME
};
