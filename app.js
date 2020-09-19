const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const initDatabase = require('./database');
const { init: initPassport } = require('./passport');
const initApi = require('./api');

const { port } = require(`./config/${process.env.NODE_ENV || 'development'}`);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

initDatabase();
initPassport(app);
initApi(app);

app.listen(port, () => console.log(`app starts at ${port} port`));
