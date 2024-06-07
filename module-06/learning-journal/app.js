const express = require('express');

const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})