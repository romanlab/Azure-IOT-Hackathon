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

// Run Express
app.listen(process.env.port || 1337);