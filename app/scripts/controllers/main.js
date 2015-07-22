'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('MainCtrl', function ($scope, Evaluacion) {
	$scope.rutaBase = window.URL + '/adjuntos/trabajadores/';

	$scope.paginaActual = 1;
	$scope.cantidadPagina = 3;
	$scope.filtro = {};

	obtenerEvaluaciones();
	$scope.pagina = function(pagina){
		$scope.paginaActual = pagina;
		obtenerEvaluaciones();
	}

	function obtenerEvaluaciones(){
		var query = {
			type: 'resumen',
			page: $scope.paginaActual,
			count: $scope.cantidadPagina,
			sorting: 'asc'
		}

		if($scope.filtro.nombre){
			query.nombre = $scope.filtro.nombre;
		}

		if($scope.filtro.fecha_evaluacion_desde){
			query.fecha_evaluacion_desde = $scope.filtro.fecha_evaluacion_desde;
		}

		if($scope.filtro.fecha_evaluacion_hasta){
			query.fecha_evaluacion_hasta = $scope.filtro.fecha_evaluacion_hasta;
		}

		if($scope.mandante){
			query.mandante = $scope.mandante.originalObject.id;
		}

		if($scope.contratista){
			query.contratista = $scope.contratista.originalObject.id;
		}

		var evaluaciones = Evaluacion.query(query);
		evaluaciones.$promise.then(function(data){
			$scope.evaluaciones = data.data;
			$scope.total = data.total;
		});
	}

	$scope.filtrar = function(){
		$scope.paginaActual = 1;
		obtenerEvaluaciones();
	}
});
