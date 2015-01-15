var baseUrl = 'http://autopark.azurewebsites.net';

angular.module('autopark', ['ui.bootstrap'])
  .controller('MainCtrl', function($scope, $http) {
    $scope.modal = false;
    $scope.blank = true;
    $scope.rowA = [];
    $scope.rowB = [];
    $scope.carId = null;
    $scope.troubleUsers = [];

    function getSpots() {
      return $http.get(baseUrl + '/spots')
        .then(function(response) {
          var spots = response.data;
          spots.forEach(function(spot) {
            var date = new Date(spot.parkingOut);
            var minutes = String(date.getMinutes());
            //one digit, yes ugly
            if(/\d+/g.test(spot.parkingOut)) {
              spot.time = spot.parkingOut;
            } else {
              spot.time = [date.getHours(), ':', minutes >> 1 ? minutes : minutes + '0'].join('');
            }
            return !spot.location.indexOf('A')
              ? $scope.rowA.push(spot)
              : $scope.rowB.push(spot);
          });
          $scope.blank = false;
        });
    }

    getSpots();

    $http.get(baseUrl + '/users')
      .then(function(response) {
        response.data.map(function(user) {
          return user.troublemaker
            ? $scope.troubleUsers.push(user)
            : false;
        });
      });

    $scope.updateUser = function(userId) {
      $scope.userToUpdate = userId;
      $scope.modal = true;
    };

    $scope.updateForm = function() {
      $http.put(baseUrl + '/spots/' + $scope.carId,
        { owner: $scope.userToUpdate, assigned:true, parkingOut: $scope.time
        })
        .then(function(resp) {
          $scope.troubleUsers.forEach(function(user, i) {
            if(user.id == $scope.userToUpdate) {
              $scope.troubleUsers.splice(i, 1);
            }
          });
          delete $scope.carId;
          delete $scope.userToUpdate;
          delete $scope.time;
          getSpots().then(function() {
            $scope.modal = false;
          });
        });
    }
  });