'use strict';

/**
 * @ngdoc function
 * @name firebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseApp
 */
angular.module('firebaseApp')
  .controller('HomeCtrl', ['$scope', '$window', '$mdToast', '$firebaseArray', function ($scope, $window, $mdToast, $firebaseArray) {



    var ref = new Firebase("https://blistering-heat-8553.firebaseio.com");

    var authData = ref.getAuth();
    if (!authData) {
      $window.location.href = '/';
    }



    $scope.logOut = function(){
      ref.unauth();
      $window.location.href = '/';
    };


  }]);
