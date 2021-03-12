const express = require('express');
const app = express();
const serverConfig = require('./server-config.json');
const mapConfig = require('./map-config.json');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('index.html');
});

app.get('/api', (req, res) => {
  res.send(mapConfig);
});

app.listen(serverConfig.port, () => {
  console.log(`Started server, port: ${serverConfig.port}`);
});