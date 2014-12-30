'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the seedApp
 */
angular.module('seedApp')
	.controller('HomeCtrl', function ($scope, $http) {
		$scope.title = 'Home Controller';
		$http({
			url: 'http://rockola-178928.sae1.nitrousbox.com/test/restricted',
			method: 'GET'
		}).then(function(response) {
			$scope.datos = response.data;
		}, function(error) {
			console.log(error.data);
		});
	});
