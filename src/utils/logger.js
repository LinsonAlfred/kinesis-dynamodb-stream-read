/* Creating a logger that will log to the console. */
const pino = require('pino');

const Log = pino({
    level: 'debug'
});

module.exports = Log;