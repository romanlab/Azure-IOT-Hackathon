'use strict';
var spots = require('../models/spots')
  , users = require('')
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
 * get spots by id
 * @route /:id
 * @method GET
 */
function getAction(req, res) {
  var id = req.params.id || '';
  var response = resFactory(res);
  spots.findById(id)
    .then(response)
    .catch(response);
}

/**
 * @description
 * get all spots
 * @route /
 * @method GET
 */
function getAllAction(req, res) {
  var response = resFactory(res);
  spots.find({})
    .then(response)
    .catch(response);
}

/**
 * @description
 * create new spots
 * @route /
 * @method POST
 */
function addAction(req, res) {
  var response = resFactory(res);
  spots.create(req.body)
    .then(response)
    .catch(response);
}

/**
 * @description
 * update specific spot
 * @route /:id
 * @method PUT
 */
function updateAction(req, res) {
  var id = req.params.id || '';
  var response = resFactory(res);
  spots.findOneAndModify({ id: id }, req.body)
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
  spots.findAndRemove({ id: id })
    .then(response)
    .catch(response);
}


function pingAction(req, res) {
  var id = req.params.id || '';
//  spots.findById()
}

/**
 * @expose
 */
module.exports = {
  get: getAction,
  add: addAction,
  ping: pingAction,
  remove: removeAction,
  update: updateAction,
  getAll: getAllAction
};
