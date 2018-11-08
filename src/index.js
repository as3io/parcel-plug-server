const app = require('./app');
const pkg = require('../package.json');
const { PORT } = require('./env');

const { log } = console;

const server = app.listen(PORT, () => {
  log(`Express app "${pkg.name}" listening on port ${PORT}`);
});
server.on('error', (e => setImmediate(() => { throw e; })));
