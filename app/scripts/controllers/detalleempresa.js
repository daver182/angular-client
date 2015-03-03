'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:DetalleempresaCtrl
 * @description
 * # DetalleempresaCtrl
 * Controller of the seedApp
 */
angular.module('seedApp')
  .controller('DetalleempresaCtrl', function ($scope, $http, $stateParams) {
    $http({
		url: 'http://crosan-180346.sae1.nitrousbox.com/contratistas/public/empresa/' + $stateParams.id,
		method: 'GET'
	}).then(function(response) {
		$scope.empresa = response.data;
	}, function(error) {
		console.log(error.data);
	});
  });
