'use strict';

let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require('./config');
var models = require('./model');

let app = express();
app.use('/css', express.static(path.resolve(__dirname, '../public', 'css')));
app.use('/js', express.static(path.resolve(__dirname, '../public', 'js')));

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'view/index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.models = models;
require('./controller/api')(app);

var db = mongoose.connection;
db.on('error', function () {
  console.log('Fail to connect to mongodb');
});
db.on('disconnected', function () {
  console.log('Mongodb disconnected. Reconnecting...');
  mongoose.connect(config.dbConnection, { server: { auto_reconnect: true } });
});
db.once('open', function () {
  console.log('Mongodb connected successfully');
  app.listen(config.port);
  console.log('Web Server started on port ' + config.port);
});
mongoose.connect(config.dbConnection);
