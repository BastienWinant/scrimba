const express = require('express');

const app = express();

// get request
app.get('/', (req, res, next) => {
  res.send('Hello World');
})

// dynamic route
app.get('/:id', (req, res, next) => {
  res.send(`Hello ${ req.params.id }`);
})

// set response status
app.get('/error', (req, res, next) => {
  res.status(404).send('Not found')
})

// put request
app.put('/expressions/:id', (req, res, next) => {
  const queryArguments = req.query;
})

app.post('/expressions', (req, res, next) => {})
app.delete('/expressions/:id', (req, res, next) => {})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})