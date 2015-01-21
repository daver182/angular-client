'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:DetalletrabajadorCtrl
 * @description
 * # DetalletrabajadorCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('DetalletrabajadorCtrl', function ($scope, $http, $stateParams) {
	$http({
		url: 'http://crosan-180346.sae1.nitrousbox.com/contratistas/public/trabajador/' + $stateParams.id,
		method: 'GET'
	}).then(function(response) {
		$scope.trabajador = response.data;
	}, function(error) {
		console.log(error.data);
	});
});
