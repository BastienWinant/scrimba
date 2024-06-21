// Load the route handlers
const usersRoutes = require('./routes/users');

module.exports = function(app) {
  // Define the routes
  app.use('/users', usersRoutes);
};