const express = require('express');

const router = express.Router();

// middleware functions
router.use('/test', (req, res, next) => {
  console.log(`This is another test middleware function`);
  next();
})

// get request
router.get('/', (req, res, next) => {
  res.send('Hello World');
})

router.get('/test', (req, res, next) => {
  res.send('Hello Test');
})

// dynamic route
router.get('/test/:id', (req, res, next) => {
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