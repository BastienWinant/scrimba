const express = require('express');

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("This is the home page")
})

router.get("/search", (req, res, next) => {
  res.send("This is the search page")
})

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.send('Something broke!');
})

module.exports = router;