'use strict';
var express    = require('express')
  , controller = require('./controller')
  , bodyParser = require('body-parser')
  , app        = module.exports = express();

// Configure Express
app.use(bodyParser.json());

// Routes
app.get('/', controller.hello);
app.route('/users/')
  .get(controller.getAll)
  .post(controller.add);
app.route('/users/:id')
  .get(controller.get)
  .put(controller.update)
  .delete(controller.remove);
