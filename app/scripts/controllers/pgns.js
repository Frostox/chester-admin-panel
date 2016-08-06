'use strict';

/**
 * @ngdoc function
 * @name firebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseApp
 */
angular.module('firebaseApp')
  .controller('PgnsCtrl', ['$scope', '$window', '$mdToast', '$firebaseArray', '$location', function ($scope, $window, $mdToast, $firebaseArray, $location) {




  	var obj={};

    $scope.pgn = {};
    $scope.chapter = $location.search();
    console.log($scope.chapter);

    var ref = new Firebase("https://blistering-heat-8553.firebaseio.com");
    var refPgns = new Firebase("https://blistering-heat-8553.firebaseio.com/pgns");

    var authData = ref.getAuth();
    if (!authData) {
      $window.location.href = '/';
    }

    var refresh = function(){
      console.log($scope.chapter.id);
      var query = refPgns.orderByChild("chapter").equalTo($scope.chapter.id);

  		$scope.pgns = $firebaseArray(query);
    };

    $scope.clear = function(){
      $scope.pgn = {};
      angular.element("input[type='file']").val(null);
    }


    $scope.add = function(){



      refPgns.push(obj);

      if($scope.pgntext!=''&&$scope.pgntext!=null){
        var pgns = $scope.pgntext.split("[Event");
        console.log(pgns.length);
        console.log(pgns[1]);
        var i;
        for(i=1; i<pgns.length; i++){
          var pgndata = "[Event" + pgns[i];
          obj.content = pgndata;
          obj['chapter'] = $scope.chapter.id;
          refPgns.push(obj);

        }
      }


      $scope.clear();
  	};

    $scope.edit = function(pgn){
      $scope.pgn.$id = pgn.$id;
      $scope.pgn.content = pgn.content;
    }


    $scope.replace = function(){
      var index = $scope.pgn.$id;
  		var refChapter = new Firebase("https://blistering-heat-8553.firebaseio.com/pgns/"+index);
  		refChapter.update(obj);

      $scope.clear();
    }


    $scope.logOut = function(){
      ref.unauth();
      $window.location.href = '/';
    };

    $scope.getFen = function(pgn){
      var content = pgn.content;
      if(!content) return '';
      var chess = new Chess();
      chess.load_pgn(content);
      var cfg = {
        position: chess.fen(),
        showNotation: false
      }
      ChessBoard(pgn.$id, cfg);
      return chess.fen();
    }




    $scope.showContent = function($fileContent){
        obj={};
        obj.content = $fileContent;
        obj['chapter'] = $scope.chapter.id;

    };

    refresh();

  }]);
