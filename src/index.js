const pkg = require('../package.json');
const { PORT } = require('./env');
const { app } = require('./express');

const { log } = console;

const run = async () => {
  await app(PORT);
  log(`Express app "${pkg.name}" listening on port ${PORT}`);
};

run().catch(e => setImmediate(() => { throw e; }));
