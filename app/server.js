const express = require('express');
const Bundler = require('parcel-bundler');
const path = require('path');
const proxy = require('http-proxy-middleware');
const fallback = require('express-history-api-fallback');

const app = express();
const port = process.env.PORT || 3000;
const file = path.join(__dirname, './index.html');

let listen = null;
const options = process.env.NODE_ENV === 'production'
  ? {}
  : {
    watch: true,
  };

app.use('/', express.static(path.join(__dirname, '../dist')));

app.use('/api', proxy({
  target: process.env.API_HOST || 'http://localhost:5000',
  changeOrigin: true,
}));

app.use(fallback('index.html', {
  root: path.join(__dirname, '../dist'),
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const bundler = new Bundler(file, options);

bundler.on('buildStart', () => {
  if (listen !== null) listen.close();
});

bundler.on('buildEnd', () => {
  listen = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

bundler.on('buildError', (err) => {
  throw err;
});

bundler.bundle();
