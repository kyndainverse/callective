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

  $scope.articles = function () {

dpd.articles.get(function (result, err) {
  if(err) return console.log(err);
 //    console.log(result);
    $scope.allarticles = result;
    });
   // console.log($scope.allarticles)
   var $length = $scope.allarticles.length;
   // console.log($length);
   for (var i = 0; i < $scope.allarticles.length; i++) {
    console.log($scope.allarticles[i].Title);
    //Do something
}
  };

  $scope.test = 0 ;

});