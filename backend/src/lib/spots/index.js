'use strict';
'use strict';
var express    = require('express')
  , controller = require('./controller')
  , bodyParser = require('body-parser')
  , app        = module.exports = express();

// Configure Express
app.use(bodyParser.json());

// Routes
app.route('/spots/')
  .get(controller.getAll)
  .post(controller.add);
app.route('/spots/:id')
  .get(controller.get)
  .put(controller.update)
  .delete(controller.remove);

app.route('/events/:id')
  .put(controller.ping);
