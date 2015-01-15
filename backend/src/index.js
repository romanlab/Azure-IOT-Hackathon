'use strict';
var express = require('express')
  , users   = require('./lib/users')
  , spots   = require('./lib/spots')
  , app     = module.exports = express();

// App Middleware
app.use(users);
app.use(spots);

// Run Express
app.listen(1337);