/**
 * Created by k on 15/01/2015.
 */

"use strict";

// get the users
var UsersController = function ($scope, parkAPI, $location) {

    $scope.submit = function () {

        var onUser = function(data) {
            $location.path("/main");
        };

        var onError = function(error) {
            $scope.error = "error:" + error.data;
        };

        parkAPI.setUser(angular.extend($scope.user, { phone: Number($scope.user.phone) })).then(onUser,onError);
};

    $scope.listUsers = function () {
        var onUser = function(data) {
            $scope.allUsers = data.data;
        };

        var onError = function(error) {
            $scope.error = "error:" + error.data;
        };

        parkAPI.getAllUsers().then(onUser, onError);
    };

    $scope.listUsers();
};

angular.module('AutoParkApp').controller('UsersController', UsersController);
