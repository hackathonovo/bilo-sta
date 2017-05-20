/* eslint no-console: 'off' */

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

var routesApi = require('./server_api/routes/index');

app.prepare()
  .then(() => {
    const server = express();

    server.use('/api', routesApi);

    server.get('*', (req, res) => {
      handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  });
