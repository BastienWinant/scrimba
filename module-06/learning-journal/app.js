const path = require('path');
const express = require('express');

const app = express();

// Set templating engine
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// Setup for production environment
// to run in prod: NODE_ENV=production node app
if ('production' == app.get('env')) {
  app.get('/', (req, res, next) => {
    res.set('Environment', 'Prod');
    next();
  })
}

// Setup for development environment
if ('development' == app.get('env')) {
  // app.use(express.errorHandler());
  app.get('/', (req, res, next) => {
    res.set('Environment', 'Dev');
    next();
  });
}

// Pass the Express instance to the routes module
require('./routes')(app);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})