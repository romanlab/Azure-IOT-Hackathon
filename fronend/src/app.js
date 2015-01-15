angular.module('autopark', ['ui.bootstrap'])
  .controller('MainCtrl', function($scope, $http) {
    $scope.blank = true;
    $scope.rowA = [];
    $scope.rowB = [];
    $http.get('http://localhost:1337/spots')
      .then(function(response) {
        var spots = response.data;
        spots.forEach(function(spot) {
          var date = new Date(spot.parkingOut);
          var minutes = String(date.getMinutes());
          //one digit, yes ugly
          spot.time = [date.getHours(), ':', minutes >> 1 ? minutes : minutes + '0'].join('');
          return !spot.location.indexOf('A')
            ? $scope.rowA.push(spot)
            : $scope.rowB.push(spot);
        });
        $scope.blank = false;
      });
  });