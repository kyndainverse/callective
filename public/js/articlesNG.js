var app = angular.module('callactive', []);

app.controller('CallectiveApp', function($scope) {

$scope.login = function() {
     dpd.users.login({
        username: $scope.username,
        password: $scope.password

     }, function(session, error) {
    
    if (error) {
        console.log(error);
      } else {
        console.log(session);

      }


     });
  };


});