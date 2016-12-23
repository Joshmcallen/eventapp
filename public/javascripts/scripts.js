// https://angular-ui.github.io/

// setup app and pass ui.bootstrap as dep
var myApp = angular.module("angularTypeahead", ["ui.bootstrap"]);

// define factory for data source
myApp.factory("Names", function($http){

  var names = ["Joshua", "Marco", "Gulmaro", "Jackson", "Christina", "Sarah", "Silvia", "Laura",
               "Elia", "Casey", "Adrian", "Edgar", "Tien", "Leonardo", "Gracie"];
  // var names = http.get('/')

// $http.get('content.json').success(function(members) {
//     // you can do some processing here
//     names = [];
//     for (i = 0; i < members.length; i++) {
//     names.push(members[i].name);
//     }
//
//     console.log(names);
//
//     names.content = members;
// });

return names;
});

// setup controller and pass data source
myApp.controller("TypeaheadCtrl", function($scope, Names) {

	$scope.selected = undefined;

	$scope.names = Names;

});
