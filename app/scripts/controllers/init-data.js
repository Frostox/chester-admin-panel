'use strict';

/**
 * @ngdoc function
 * @name firebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseApp
 */
angular.module('firebaseApp')
  .controller('InitDataCtrl', ['$scope', '$window', '$mdToast', '$firebaseArray', function ($scope, $window, $mdToast, $firebaseArray) {

    var ref = new Firebase("https://blistering-heat-8553.firebaseio.com");
    var refChapters = new Firebase("https://blistering-heat-8553.firebaseio.com/chapters");



    var refPgns = new Firebase("https://blistering-heat-8553.firebaseio.com/pgns");

    $scope.showContent = function($fileContent){


        var pgns = $fileContent.split("[Event");

        console.log(pgns.length);
        console.log(pgns[0]);

        var i;

        var chaptersText = [];

        return;

        console.log(pgns.length);
        for(i=0; i<pgns.length; i++){
          if(pgns[i].length==0) continue;
          var index = pgns[i].indexOf("[Event ");
          var newString = pgns[i].substring(index, pgns[i].length);
          //console.log(newString);
          var subPgnsClone = [];
          var subPgns = newString.split("[Event ");
          for(var j=0; j<subPgns.length; j++){
            if(subPgns[j].length==0) continue;
            subPgns[j] = "[Event " + subPgns[j];
            subPgnsClone.push(subPgns[j]);
            //console.log(subPgns[j]);
          }
          chaptersText.push(subPgnsClone);
        }

        for(i=0; i<chaptersText.length; i++){
          console.log(i + " - " + chaptersText[i].length);

        }

        for(i=0; i<chapters.length; i++){
          var chapter = chapters[i];
          var key = refChapters.push({
            "chapter": chapter.name
          }).key();

          var chapterPgns = chaptersText[i];
          for(var k=0; k<chapterPgns.length; k++){
            refPgns.push({
              "chapter": key,
              "content": chapterPgns[k]
            });
          }

        }
    };

    var chapters =
    [
  		{
  			"name": "01 Checkmate in one"
  		},
  		{
  			"name": "02 Checkmate in two"
  		},
  		{
  			"name": "03 Checkmate in three"
  		},
  		{
  			"name": "04 Pin"
  		},
  		{
  			"name": "05 Knigh Fork"
  		},
  		{
  			"name": "06 Double Attack"
  		},
  		{
  			"name": "07 Skewer Attack"
  		},
  		{
  			"name": "08 Back Rank"
  		},
  		{
  			"name": "09 Discovered Attack"
  		},
  		{
  			"name": "10 Discovered Check"
  		},
  		{
  			"name": "11 Destroying the Defender"
  		},
  		{
  			"name": "12 Decoy"
  		},
  		{
  			"name": "13 Deflection"
  		},
  		{
  			"name": "14 Overloaded Piece"
  		},
  		{
  			"name": "15 Line Opening & Closing"
  		},
  		{
  			"name": "16 Square Vacation"
  		},
  		{
  			"name": "17 Passed Pawn"
  		},
  		{
  			"name": "18 X Ray Attack"
  		},
  		{
  			"name": "19 Zwischenzug"
  		},
  		{
  			"name": "20 Draw by Repetition & Stalement"
  		},
  		{
  			"name": "21 Smothered Mate"
  		},
  		{
  			"name": "22 Windmills"
  		},
  		{
  			"name": "23 Endgame Test"
  		}
  	];




  }]);
