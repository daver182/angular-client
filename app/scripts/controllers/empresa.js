'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:EmpresaCtrl
 * @description
 * # EmpresaCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('EmpresaCtrl', function ($scope, $http, ngTableParams, Empresa) {
    /*$http({
		url: 'http://crosan-180346.sae1.nitrousbox.com/contratistas/public/empresa',
		method: 'GET'
	}).then(function(response) {
		$scope.empresas = response.data;
	}, function(error) {
		console.log(error.data);
	});*/
	//$scope.empresas = Empresa.query();


	$scope.tableParams = new ngTableParams({
		page: 1,
		count: 10,
		sorting: {
			nombre: 'desc'
		}
	}, {
		total: 0,
		getData: function($defer, params) {
			var parametros = params.url();
			/*parametros.cliente = $scope.cliente;
			parametros.fecha_inicio = Fecha.transformar($scope.fechaInicio).toString();
			parametros.fecha_fin = Fecha.transformar($scope.fechaFin).toString();*/
			
			var empresas = Empresa.query(parametros);
			empresas.$promise.then(function(data){
				params.total(data.total);
				$defer.resolve(data.data);
			});
		}
	});
});
