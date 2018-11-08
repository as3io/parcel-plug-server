const express = require('express');

const app = express();

module.exports = (...args) => new Promise((resolve, reject) => {
  const server = app.listen(...args);
  server.on('error', (e => reject(e)));
  server.on('listening', () => resolve(server));
});
