'use strict';

/**
 * @ngdoc overview
 * @name firebaseApp
 * @description
 * # firebaseApp
 *
 * Main module of the application.
 */
var app = angular
  .module('firebaseApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'firebase'
  ]);
app.directive('onReadFile', function ($parse) {
return {
  restrict: 'A',
  scope: false,
  link: function(scope, element, attrs) {
          var fn = $parse(attrs.onReadFile);

    element.on('change', function(onChangeEvent) {
      var reader = new FileReader();

      reader.onload = function(onLoadEvent) {
        scope.$apply(function() {
          fn(scope, {$fileContent:onLoadEvent.target.result});
        });
      };

      reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
    });
  }
};
});
