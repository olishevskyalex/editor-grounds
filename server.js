const http = require('http');
const https = require('https');
const fs = require('fs');
const fsPromises = fs.promises;
const express = require('express');
const app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const helmet = require('helmet');
const crypto = require('crypto');
const cors = require('cors');

const serverConfig = require('./server-config.json');
let mapConfig = require('./map-config.json');

app.use ((req, res, next) => {
  if (req.secure) {
    next();
    return;
  } 
  res.redirect('https://' + req.hostname + ':' + String(Number(serverConfig.port) + 443) + req.url);
});

app.use(express.static('public'));
app.use(express.json()); 
//app.use(helmet());
app.use(cors());

const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 7);
const fileStoreOptions = {
  ttl: expiryDate,
};
app.use(session({
  secret: serverConfig['session-key'],
  resave: false,
  saveUninitialized: false,
  store: new FileStore(fileStoreOptions),
  cookie: { 
    secure: true,
    httpOnly: false,
    expires: expiryDate,
  },
}));

async function updateConfig() {
  await fsPromises.writeFile('map-config.json', JSON.stringify(mapConfig));
}

function getHash(password) {
  return crypto.createHash('sha256').update(password).digest("hex");
}

app.get('/api/map-config', (req, res) => {
  res.send(mapConfig);
});

app.put('/api/map-config', async (req, res, next) => {
  try {
    if (req.session.isAuth !== true) {
      res.status(401).send({isUpdate: false});
      return;
    }
    const key = req.body.key;
    const number = req.body.number;
    const size = req.body.size;
    const price = req.body.price;
    const status = req.body.status;
    mapConfig[key] = {
      number: number,
      size: size,
      price: price,
      status: status,
    };
    let promise = await updateConfig();
    if (promise !== undefined) {
      throw new Error('function updateConfig failed');
    }
    res.status(200).send({isUpdate: true});
  } catch(e) {
    next(e);
  }
});

app.post('/api/auth', (req, res) => {
  const login = req.body.login;
  const password = getHash(req.body.password);
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
  if (req.path === '/' || req.path === '/auth' || req.path === '/editor') {
    res.sendFile(__dirname + '/public/index.html');
    return;
  }
  res.status(404).send('Error 404');
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.message === 'function updateConfig failed') {
    res.status(500).send({isUpdate: false});
    return;
  }
  res.status(500).send('server failed');
});

let serverHttp = http.createServer(app).listen(serverConfig.port);

let sslOptions = {
   key: fs.readFileSync('ssl/key.pem'),
   cert: fs.readFileSync('ssl/cert.pem'),
   passphrase: serverConfig['ssl-phrase']
};

let serverHttps = https.createServer(sslOptions, app).listen(Number(serverConfig.port) + 443);