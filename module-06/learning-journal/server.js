const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js')
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app is listening on port ${ PORT }`)
})
