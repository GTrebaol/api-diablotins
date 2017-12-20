/**
 * Node app
 */

/**
 * Module dependencies
 */
const express = require('express');
const async = require('async');
const bigInt = require('big-integer');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const http = require('http');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const i18n = require('i18n');
const winston = require('winston');
const routeDir = __dirname + '/app/routes';
const routeFiles = fs.readdirSync(routeDir);

app = module.exports = express();

/**
 * Configuration
 */

// env config
var env = process.env.NODE_ENV || 'development';

//i18n config
i18n.configure({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  directory: __dirname + '/app/locales'
});
i18n.init();
app.set('i18n', i18n);

//logger config
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)()
//      new (winston.transports.File)({ filename: __dirname+'/logs/main.log' }) --- disabled file logging for the time being 
  ]
});
if (env === "production") {
  logger.level = 'warn';
} else {
  logger.level = 'debug';
}
app.set('logger', logger);

app.use(morgan('dev'));
//Setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());
//app.use(express.static(path.join(__dirname, 'public')));

// Read config file
var conf = require(__dirname + '/app/config/' + env + '.conf.js');

//Set config values
app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP || conf.ipAddress);
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || conf.port);
app.set('secret', conf.secret);
app.set('matchLength', conf.matchLength);

app.set('bigInt', bigInt);
app.set('bcrypt', bcrypt);
app.set('jwt', jwt);
app.set('async', async);
app.set('auth', function(req, res, next) {
  //Check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  //Decode token
  if (token) {

    //Verify secret and check the expiration datetime
    jwt.verify(token, app.get('secret'), function(err, decoded) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(403).json({code: 403, message: i18n.__('token.expired')});
        }
        return res.status(403).json({code: 403, message: i18n.__('token.failed')});
      } else {
        //Save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({code: 403, message: i18n.__('token.empty')});
  }
});

// Register services module
var services = require(__dirname + '/app/services')(conf);
app.set('services', services);


//Add CORS support
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

//Initialize routes
routeFiles.forEach(function(file) {
  var filePath = path.resolve(__dirname, routeDir, file), route = require(filePath);
  logger.info('Loading routes for ' + file);
  route.load(app);
});

//Add handlers for errors and exceptions thrown by the middleware
app.use(function(err, req, res, next) {
  logger.warn(err);
  if (err.status) {
    return res.status(err.statusCode).send({code: err.statusCode, message: 'Invalid Request Body at: ' + err.body});
  }
  return res.status(500).send({
    code: 500,
    message: 'Unhandled middleware error, please contact us with information on how to reproduce the error'
  });
});

//Handle all other routes
app.all('/*', function(req, res, next) {
  res.status(404).send({code: 404, message: 'API route not found'});
});

/**
 * Start Server
 */
var server = http.createServer(app);

server.listen(app.get('port'), app.get('ipaddress'), function() {
  logger.info('Server running and listening on port ' + app.get('port'));
});

app.server = server;
