const path = require('path');
const express = require('express');
const app = express();

require('./routes/main')(app);

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})