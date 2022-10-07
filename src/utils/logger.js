/* Creating a logger that will log to the console. */
const pino = require('pino');
const env = require('../config/env');

const Log = pino({
    level: env.LOG_LEVEL
});

module.exports = Log;