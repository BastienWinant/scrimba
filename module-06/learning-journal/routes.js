// Load the route handlers
const userRouter = require('./handlers/users');
const authRouter = require('./handlers/auth');

module.exports = function(app) {
  // Handle requests to the home page 
  app.get('/', (req, res, next) => {
    res.send('Hello World!')
  });

  // Add all the route handlers in usersRoutes to the app under the path /users
  app.use('/users', userRouter);
  app.use('/user', authRouter);
}