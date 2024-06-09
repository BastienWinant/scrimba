const express = require('express');

const router = express.Router();

// middleware functions
router.use((req, res, next) => {
  console.log(`This is a test middleware function`);
  next();
})

// get request
router.get('/', (req, res, next) => {
  res.send('Hello World');
})

// dynamic route
router.get('/:id', (req, res, next) => {
  res.send(`Hello ${ req.params.id }`);
})

// set response status
router.get('/error', (req, res, next) => {
  res.status(404).send('Not found')
})

// put request
router.put('/expressions/:id', (req, res, next) => {
  const queryArguments = req.query;
})

module.exports = router;