// https://angular-ui.github.io/

// setup app and pass ui.bootstrap as dep
var myApp = angular.module("angularTypeahead", ["ui.bootstrap"]);

// define factory for data source
myApp.factory("Names", function(){



  var names = ["Josh", "Marco", "Gulmaro", "Jackson", "Elia", "Sarah", "Sylvia", "Laura",];

        
        // names = [];
        // for (i = 0; i < members.length; i++) {
        // names.push(members[i].name);
        // }



  return names;
});

// setup controller and pass data source
myApp.controller("TypeaheadCtrl", function($scope, Names) {

	$scope.selected = undefined;

	$scope.names = Names;

});
