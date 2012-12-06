var app = angular.module('callactive', []);

app.controller('CallectiveApp', function($scope) {
            
$scope.user= 'Bob';

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


  $scope.currentUser = function () {
        
        dpd.users.me(function(me) {
            $scope.user=me.username;
         //   console.log(me.username);
        });
            // $scope.user='test';

           console.log($scope.user);
  };

  $scope.test = 0 ;

});