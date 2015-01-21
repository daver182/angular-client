'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:TrabajadoresCtrl
 * @description
 * # TrabajadoresCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('TrabajadoresCtrl', function ($scope, $http) {
	$http({
		url: 'http://crosan-180346.sae1.nitrousbox.com/contratistas/public/trabajador',
		method: 'GET'
	}).then(function(response) {
		$scope.trabajadores = response.data;
	}, function(error) {
		console.log(error.data);
	});
});
