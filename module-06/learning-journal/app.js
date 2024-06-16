const path = require('path');
const express = require('express');
const router = require('./routes/main');
const sqlite3 = require('sqlite3')

const app = express();

// connect to database
const db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.log(err.message)
  }

  console.log("Connect to the database")
})

// close the db connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

// set templating engine
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// mount routers
app.use("/", router);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})