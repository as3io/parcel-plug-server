const { port, cleanEnv } = require('envalid');

module.exports = cleanEnv(process.env, {
  PORT: port({ desc: 'The Express web server port.', default: 2218 }),
});
