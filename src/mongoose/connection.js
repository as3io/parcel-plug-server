const mongoose = require('mongoose');
const { MONGO_DSN } = require('../env');

const connection = mongoose.createConnection(MONGO_DSN, {
  // autoIndex: env.NODE_ENV !== 'production',
  ignoreUndefined: true,
  useNewUrlParser: true,
  connectTimeoutMS: 200,
});

module.exports = connection;
