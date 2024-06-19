// Load the route handlers
var main = require('./handlers/main');

module.exports = function(app) {
  // Mount the routers
  app.use('/', main);
};