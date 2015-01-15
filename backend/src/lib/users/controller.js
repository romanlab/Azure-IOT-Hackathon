'use strict';
var users = require('../models/users')
  , _     = require('agile');

/**
 * @private
 * @description
 * responseFactory, should get Express response function.
 * @param res
 * @returns {Function}
 */
function resFactory(res) {
  return function(ret) {
    if(_.isUndefined(ret)) {
      return res.status(404).send('Not Found');
    }
    var ctr = ret.constructor;
    return ctr === Error || ctr === TypeError
      ? res.status(421).send(ret.message)
      : res.status(200).send(ret);
  }
}

/**
 * @description
 * get user by id
 * @route /:id
 * @method GET
 */
function getAction(req, res) {
  var id = req.params.id || '';
  var response = resFactory(res);
  users.findById(id)
    .then(response)
    .catch(response);
}

/**
 * @description
 * get all users
 * @route /
 * @method GET
 */
function getAllAction(req, res) {
  var response = resFactory(res);
  users.find({})
    .then(response)
    .catch(response);
}

/**
 * @description
 * create new user
 * @route /
 * @method POST
 */
function addAction(req, res) {
  var response = resFactory(res);
  users.create(req.body)
    .then(response)
    .catch(response);
}

/**
 * @description
 * update specific user
 * @route /:id
 * @method PUT
 */
function updateAction(req, res) {
  var id = req.params.id || '';
  var response = resFactory(res);
  users.findOneAndModify({ id: id }, req.body)
    .then(response)
    .catch(response);
}

/**
 * @description
 * remove user by id
 * @route /:id
 * @method DELETE
 */
function removeAction(req, res) {
  var id = req.params.id || '';
  var response = resFactory(res);
  users.findAndRemove({ id: id })
    .then(response)
    .catch(response);
}

function helloAction(req, res) {
  res.status(200).send('Hello World!');
}

/**
 * @expose
 */
module.exports = {
  get: getAction,
  add: addAction,
  hello: helloAction,
  remove: removeAction,
  update: updateAction,
  getAll: getAllAction
};
