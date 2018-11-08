const pkg = require('../package.json');
const { PORT, HOSTNAME } = require('./env');
const { app: express } = require('./express');
const { connection: db } = require('./mongoose');

const { log } = console;

const run = async () => {
  log(`Starting '${pkg.name}'...`);
  const mongoose = await db;
  log(`MongoDB connected to ${mongoose.client.s.url}`);
  await express(PORT, HOSTNAME);
  log(`> Ready on on http://${HOSTNAME}:${PORT}`);
};

run().catch(e => setImmediate(() => { throw e; }));
