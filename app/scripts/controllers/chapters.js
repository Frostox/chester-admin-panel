'use strict';

/**
 * @ngdoc function
 * @name firebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseApp
 */
angular.module('firebaseApp')
  .controller('ChaptersCtrl', ['$scope', '$window', '$mdToast', '$firebaseArray', function ($scope, $window, $mdToast, $firebaseArray) {



    var ref = new Firebase("https://blistering-heat-8553.firebaseio.com");
    var refChapters = new Firebase("https://blistering-heat-8553.firebaseio.com/chapters");

    var authData = ref.getAuth();
    if (!authData) {
      $window.location.href = '/';
    }

    var refresh = function(){
  		$scope.chapters = $firebaseArray(refChapters);
    };

    $scope.edit = function(id){
      console.log(id);
    };

    $scope.open = function(chapter){
      $window.location.href = '/jade-views/pgns.html#/?id='+chapter.$id+'&chapter='+chapter.chapter;
    };

    $scope.add = function(){
  		refChapters.push({
  			chapter:$scope.chapter.chapter
  		});
  		$scope.chapter='';
  	};

    $scope.edit = function(chapter){
      $scope.chapter = {
        $id: chapter.$id,
        chapter: chapter.chapter
      };
      $window.location.href = '#card';
    };

    $scope.update = function(){
      var index = $scope.chapter.$id;
      console.log(index);
  		var refChapter = new Firebase("https://blistering-heat-8553.firebaseio.com/chapters/"+index);
  		refChapter.update({
  			chapter:$scope.chapter.chapter
  		});

      $scope.chapter = {};
    };

    $scope.logOut = function(){
      ref.unauth();
      $window.location.href = '/';
    };

    refresh();

  }]);
