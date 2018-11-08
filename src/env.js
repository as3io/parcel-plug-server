const { isURL } = require('validator');
const {
  cleanEnv,
  makeValidator,
  port,
} = require('envalid');

const mongodsn = makeValidator((v) => {
  const opts = { protocols: ['mongodb'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a Mongo DSN string with mongodb://');
});

const nonemptystr = makeValidator((v) => {
  const err = new Error('Expected a non-empty string');
  if (v === undefined || v === null || v === '') {
    throw err;
  }
  const trimmed = String(v).trim();
  if (!trimmed) throw err;
  return trimmed;
});

module.exports = cleanEnv(process.env, {
  MONGO_DSN: mongodsn({ desc: 'The MongoDB DSN to connect to.' }),
  HOSTNAME: nonemptystr({ desc: 'The Express web server host name.', default: 'localhost' }),
  PORT: port({ desc: 'The Express web server port.', default: 2218 }),
});
