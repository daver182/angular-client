'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the seedApp
 */
angular.module('seedApp')
	.controller('MainCtrl', function ($scope, $http) {
		console.log('MainCtrl');
		$scope.title = 'Main Controller';
		
	});
