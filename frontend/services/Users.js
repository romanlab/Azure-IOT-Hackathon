/**
 * Created by k on 15/01/2015.
 */


angular.module('AutoParkApp').factory('parkAPI', function ($http) {
    // GET /users
    var getAllUsers = function () {
        return $http.get("http://autopark.azurewebsites.net/users").
            success(function(data, status, headers, config) {
                return {status: status, data: data};
            }).
            error(function(data, status, headers, config) {
                return {status: status, data: data};
            });
    };

    // POST /users
    var setUser = function (userData) {
        return $http.post('http://autopark.azurewebsites.net/users', userData).
        success(function(data, status, headers, config) {
            return data;
        }).
            error(function(data, status, headers, config) {
                return status;
            });
    };


    // PUT /users/:id

    var updateUser = function(username){
      return $http.put("http://autopark.azurewebsites.net/users", username).
          success(function(data, status, headers, config) {
              return data;
          }).
          error(function(data, status, headers, config) {
              return status;
          });
    };

    // GET /users/:id

    var getUser = function (username) {
        return $http.get("http://autopark.azurewebsites.net/users/" + username).
            success(function(data, status, headers, config) {
                return {status: status, data: data};
            }).
            error(function(data, status, headers, config) {
                return {status: status, data: data};
            });
    };

    // DELETE /users/:id

    var deleteUser = function (username) {
        return $http.delete("http://autopark.azurewebsites.net/users/" + username).
            success(function(data, status, headers, config) {
                return {status: status, data: data};
            }).
            error(function(data, status, headers, config) {
                return {status: status, data: data};
            });
    };

    // PUT /spots/:id

    var updateSpot = function(spotID) {
      return $http.put("http://autopark.azurewebsites.net/spots/", spotID).
          success(function(data, status, headers, config) {
              return {status: status, data: data};
          }).
          error(function(data, status, headers, config) {
              return {status: status, data: data};
          });
    };

    // GET /spots:id

    var getSpot = function(spotID) {
        return $http.get("http://autopark.azurewebsites.net/spots/" + spotID).
            success(function(data, status, headers, config) {
                return {status: status, data: data};
            }).
            error(function(data, status, headers, config) {
                return {status: status, data: data};
            });

    };

    // GET /spots

    var getSpots = function() {
        return $http.get("http://autopark.azurewebsites.net/spots/").
            success(function(data, status, headers, config) {
                return {status: status, data: data};
            }).
            error(function(data, status, headers, config) {
                return {status: status, data: data};
            });

    };

    return {
        getAllUsers: getAllUsers,
        setUser: setUser,
        updateUser: updateUser,
        getUser: getUser,
        deleteUser: deleteUser,
        updateSpot: updateSpot,
        getSpot: getSpot,
        getSpots: getSpots
    };

});


//var getUser = function (user) {
//    return $http.get(user.repos_url)
//        .then(function (responce) {
//            return responce.data;
//        });
//};
//
//var getRepoDetails = function(username, reponame) {
//    var repo; // place the info here
//    var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
//
//    return $http.get(repoUrl) //promise chaining
//        .then(function(responce) {
//            repo = responce.data;
//            return $http.get(repoUrl + "/forks")
//        })
//        .then(function(responce) {
//            repo.forks = responce.data;
//            return repo;
//        });
//};




