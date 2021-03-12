const express = require('express');
const app = express();
const serverConfig = require('./server-config.json');

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(serverConfig.port, () => {
  console.log(`Started server, port: ${serverConfig.port}`);
});