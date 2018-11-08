const pkg = require('../package.json');
const { PORT, HOSTNAME } = require('./env');
const { app: express } = require('./express');
const { connection: db } = require('./mongoose');

const { log } = console;

const run = async () => {
  log(`Starting '${pkg.name}'...`);
  const mongoose = await db;
  log(`MongoDB connected to ${mongoose.client.s.url}`);
  const server = await express(PORT, HOSTNAME);
  log(`> Ready on on http://${HOSTNAME}:${PORT}`);

  const graceful = () => {
    log(`Stopping '${pkg.name}'...`);
    server.close(() => {
      log('Web server stopped.');
      mongoose.close(false, () => {
        log('MongoDB connection closed.');
        log('> Stopped');
        process.exit();
      });
    });
  };

  process.on('SIGTERM', graceful);
  process.on('SIGINT', graceful);
};

run().catch(e => setImmediate(() => { throw e; }));
