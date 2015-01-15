'use strict';
var db    = require('../db')
  , model = require('./model')
  , spots = db.use('spots');

// Use `model` as a schema
spots.schema(model);

/**
 * @exports
 */
module.exports = spots;