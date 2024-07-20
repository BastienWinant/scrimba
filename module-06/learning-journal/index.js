/**
* index.js
* This is your main app entry point
*/

// import modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const logger = require('morgan');

// Set up SQLite in the global namespace
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db',function(err){
	if(err){
		console.error(err);
		process.exit(1); // bail out we can't connect to the DB
	} else {
		console.log("Database connected");
		global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
	}
});

// Set up express application
const app = express();
const port = process.env.PORT || 3000;

// Define store for session data
const store = new session.MemoryStore();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // set location of static files
app.use(
  session({
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true, sameSite: "none" },
    saveUninitialized: false,
    resave: false,
		store: store
  })
);
app.use(passport.authenticate('session'));

// Set up EJS templating
app.set('view engine', 'ejs'); // set the app to use ejs for rendering

// Pass the Express instance to the routes module
require('./routes')(app)

// Make the web application listen for HTTP requests
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

