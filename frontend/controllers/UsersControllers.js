/**
 * Created by k on 15/01/2015.
 */

"use strict";

// get the users
var UsersController = function ($scope, parkAPI) {

    //$scope.data = parkAPI.getSpots();

    $scope.submit = function () {
        parkAPI.setUser($scope.user);
    }




};

angular.module('AutoParkApp').controller('UsersController', UsersController);

// http get example (ajax), using promises

//register like this for minification:
//module.controller('HttpCtrl', ["$scope", "$http", "$interval", MainController]);