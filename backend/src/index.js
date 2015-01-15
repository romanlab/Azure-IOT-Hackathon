'use strict';
var express = require('express')
  , users   = require('./lib/users')
  , spots   = require('./lib/spots')
  , cors    = require('./lib/cors')
  , app     = module.exports = express();

// App Middleware
app.use(cors);
app.use(users);
app.use(spots);

app.post('/climatedata', function(req, res, next) {
  res.status(200).send('OK');

});

// Run Express
app.listen(process.env.port || 1337);