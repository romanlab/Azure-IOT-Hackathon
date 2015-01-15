/**
 * Created by k on 15/01/2015.
 */

var app = angular.module('AutoParkApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/users', {
            templateUrl: "partials/users.html",
            controller: "UsersController"
        })
        .when('/spots', {
            templateUrl: "partials/spots.html",
            controller: "SpotsController"
        })
        .otherwise({redirectTo: "/users"}); //default = main

});

