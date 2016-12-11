// https://angular-ui.github.io/

// setup app and pass ui.bootstrap as dep
var myApp = angular.module("angularTypeahead", ["ui.bootstrap"]);

// define factory for data source
myApp.factory("Names", function(){

  var names = ["test"];

  return names;
});

// setup controller and pass data source
myApp.controller("TypeaheadCtrl", function($scope, Names) {

	$scope.selected = undefined;

	$scope.names = Names;

});
