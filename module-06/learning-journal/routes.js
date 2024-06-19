// Load the route handlers
var mainRouter = require('./handlers/main');

module.exports = function(app) {
  // Mount the routers
  app.use('/', mainRouter);
};