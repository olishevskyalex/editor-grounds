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

app.get('/editor', (req, res) => {
  if (req.session.isAuth === true) {
    res.sendFile(__dirname + '/public/index.html');
    return;
  }
  res.status(403).send('Error 403');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api', (req, res) => {
  res.send(mapConfig);
});


app.post('/auth', (req, res) => {
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

app.listen(serverConfig.port, () => {
  console.log(`Started server, port: ${serverConfig.port}`);
});