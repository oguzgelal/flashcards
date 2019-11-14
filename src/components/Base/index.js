if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Base.prod');
} else {
  module.exports = require('./Base.dev');
}
