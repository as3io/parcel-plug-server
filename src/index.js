const app = require('./app');
const pkg = require('../package.json');

const { PORT = 2112 } = process.env;
const { log } = console;

const server = app.listen(PORT, () => {
  log(`Express app "${pkg.name}" listening on port ${PORT}`);
});
server.on('error', (e => setImmediate(() => { throw e; })));
