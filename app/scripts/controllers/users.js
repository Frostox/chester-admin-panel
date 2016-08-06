'use strict';

/**
 * @ngdoc function
 * @name firebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseApp
 */
angular.module('firebaseApp')
  .controller('UsersCtrl', ['$scope', '$window', '$mdToast', '$firebaseArray', function ($scope, $window, $mdToast, $firebaseArray) {

    var ref = new Firebase("https://blistering-heat-8553.firebaseio.com");
    var refUsers = new Firebase("https://blistering-heat-8553.firebaseio.com/users");

    $scope.users = $firebaseArray(refUsers);
    $scope.unblocked = 'unblocked';

    $scope.clear = function(){
      $scope.user = {};
    }

    $scope.block = function(id, blocked){
      var refUser = new Firebase("https://blistering-heat-8553.firebaseio.com/users/"+id);
      refUser.update({
  			blocked: blocked
  		});



    }


    $scope.add = function(){
      ref.createUser({
        email: $scope.user.email,
        password: $scope.user.password
      }, function(error, userData) {
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              console.log("The new user account cannot be created because the email is already in use.");
              $mdToast.show(
                $mdToast.simple()
                  .textContent('This email is already in use!')
                  .hideDelay(3000)
              );
              break;
            case "INVALID_EMAIL":
              console.log("The specified email is not a valid email.");
              $mdToast.show(
                $mdToast.simple()
                  .textContent('The specified email is not a valid email.')
                  .hideDelay(3000)
              );
              break;
            default:
              console.log("Error creating user:", error);
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Error creating user')
                  .hideDelay(3000)
              );
          }
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          refUsers.push({
            email: $scope.user.email,
            uid: userData.uid
          });
      		$scope.clear();
        }
      });


    }



  }]);
