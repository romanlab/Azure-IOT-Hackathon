/**
 * Created by k on 15/01/2015.
 */
var SpotsController = function ($scope, parkAPI, $location) {

    $scope.submit = function () {
        var d = new Date();
        var n = d.getTime();
        var temp = new Date($scope.user.timeOut).getTime(); // get unixtime
        $scope.user.timeOut = new Date(n+temp);
        var put = {
            owner: $scope.user.ownerid,
            parkingOut: $scope.user.timeOut
        };


        var onUser = function(data) {
            $location.path("/main");
        };

        var onError = function(error) {
            $scope.error = "error:" + error.data;
        };
        console.log(put);
        parkAPI.updateSpot($scope.user.parkid, JSON.stringify(put)).then(onUser,onError);
    }
};

angular.module('AutoParkApp').controller('SpotsController', SpotsController);
