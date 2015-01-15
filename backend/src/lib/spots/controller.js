'use strict';
var spots   = require('../models/spots')
  , Promise = require('bluebird')
  , users = require('../models/users')
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
  Promise.props({
    spots: spots.find({}),
    users: users.find({})
  }).then(function(data) {
    return (data.spots || []).map(function(spot) {
      var id = spot.owner;
      spot.owner = _.find(data.users, 'id ==' + id) || id;
      return spot;
    });
  })
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
    .then(function(spot) {
      return users.update({ id: req.body.owner }, { troublemaker: false });
    })
    .then(response)
    .catch(response);
}

/**
 * @description
 * remove spots by id
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


/**
 * @description
 * event/ping route
 * @route /:id
 * @method DELETE
 */
function pingAction(req, res) {
  var id = String(req.params.id) || '';
  var response = resFactory(res);

  // sign out action
  function signOut(spot, user) {
    var refresh = { assigned: false, owner: "9999999", parkingOut: new Date(0).toString() };
    return Promise.props({
      0: spots.findOneAndModify({ id: spot.id }, refresh),
      1: users.findOneAndModify({ id: user.id }, { troublemaker: false })
    });
  }

  // sign in action
  function signIn(user) {
    // create it, if it's not exists
    if(_.isUndefined(user)) {
      return users.create({ id: id, name: 'Anonymous' })
    }
    return users.findOneAndModify({ id: id }, { troublemaker: !user.troublemaker });
  }

  Promise.props({
    spot: spots.findOne({ owner: id }),
    user: users.findById(id)
  }).then(function(obj) {
      return obj.spot
        ? signOut(obj.spot, obj.user)
        : signIn(obj.user);
    })
    .then(response)
    .catch(response);
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
