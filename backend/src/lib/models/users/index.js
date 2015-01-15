'use strict';
var db    = require('../db')
  , model = require('./model')
  , users  = db.use('users');

// Use `model` as a schema
users.schema(model);

/**
 * @exports
 */
module.exports = users;