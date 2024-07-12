// Load the route handlers
const user = require('./handlers/users');

module.exports = function(app) {
  // Handle requests to the home page 
  app.get('/', (req, res) => {
      res.send('Hello World!')
  });

  // Add all the route handlers in usersRoutes to the app under the path /users
  app.use('/users', user);
};