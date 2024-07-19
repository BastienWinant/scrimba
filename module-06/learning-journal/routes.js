var bcrypt = require('bcryptjs');

// Load the route handlers
const user = require('./handlers/users');

module.exports = function(app) {
  // Handle requests to the home page 
  app.get('/', (req, res, next) => {
    res.send('Hello World!')
  });

  // Add all the route handlers in usersRoutes to the app under the path /users
  app.use('/users', user);

  app.get('/signup', (req, res, next) => {
    res.render('signup.ejs')
  })

  app.post('/signup', (req, res, next) => {
    const {username, email, password} = req.body;
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    res.send(`${username} ${email} ${password} | ${hash}`)
  })
}