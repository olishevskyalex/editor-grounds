const express = require('express');
const app = express();
const serverConfig = require('./server-config.json');
const mapConfig = require('./map-config.json');
const session = require('express-session');

app.use(express.static('public'));
app.use(express.json()); 

app.disable('x-powered-by');

const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 7);
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    httpOnly: false,
    expires: expiryDate,
  },
}));

app.get('/api/map-config', (req, res) => {
  res.send(mapConfig);
});

app.put('/api/map-config', (req, res) => {
  if (req.session.isAuth !== true) {
    res.status(401).send({isUpdata: false});
    return;
  }
  const [key, number, size, price, status] = [
    req.body.key, 
    req.body.number, 
    req.body.size, 
    req.body.price, 
    req.body.status
  ];
  mapConfig[key] = {
    number: number,
    size: size,
    price: price,
    status: status,
  };
  res.status(200).send({isUpdata: true});
});

app.post('/api/auth', (req, res) => {
  const [login, password] = [req.body.login, req.body.password];
  let checkPassed = false;
  if (login === serverConfig.login && password === serverConfig.password) {
    checkPassed = true;
  }

  if (checkPassed) {
    req.session.isAuth = true;
    req.session.name = login;
    res.status(200).send({isAuth: true});
    return;
  }
  res.status(200).send({isAuth: false});
});

app.post('/api/exit', (req, res) => {
  req.session.destroy();
  res.status(200).send({isExit: true});
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(serverConfig.port, () => {
  console.log(`Started server, port: ${serverConfig.port}`);
});