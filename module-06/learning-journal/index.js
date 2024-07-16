/**
* index.js
* This is your main app entry point
*/

// Set up express, bodyparser and EJS
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set the app to use ejs for rendering
app.use(express.static(path.resolve(__dirname, 'public'))); // set location of static files

// Set up session configuration
const session = require('express-session');
const store = new session.MemoryStore(); // default server-side session storage
const sessionConfig = session({
    secret: "f4z4gs$Gcg",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: 86400000,
        secure: true,
        sameSite: "none"
    }
})
app.set("trust proxy", 1);
app.use(sessionConfig)

// Set up SQLite
// Items in the global namespace are accessible throught out the node application
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

// Pass the Express instance to the routes table
require('./routes')(app);


// Make the web application listen for HTTP requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

