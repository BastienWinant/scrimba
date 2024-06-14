// module.exports = (app) => {
//   app.get("/", (req, res, next) => {
//     res.send("Hello World")
//   })

//   app.get("/search", (req, res, next) => {
//     res.send("this is the search page")
//   })
// }

const express = require('express');

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("This is the home page")
})

router.get("/search", (req, res, next) => {
  res.send("This is the search page")
})

module.exports = router;