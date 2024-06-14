const path = require('path');
const express = require('express');
const router = require('./routes/main')

const app = express();

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