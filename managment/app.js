/**
 * Created by k on 15/01/2015.
 */

var app = angular.module('AutoParkApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl: "partials/register.html",
            controller: "UsersController"
        })
        .when('/spots', {
            templateUrl: "partials/spots.html",
            controller: "SpotsController"
        })
        .when('/main', {
            templateUrl: "partials/main.html"
        })
        .when('/listUsers', {
            templateUrl: "partials/listUsers.html",
            controller: "UsersController"
        })
        .otherwise({redirectTo: "/main"}); //default = main

});

