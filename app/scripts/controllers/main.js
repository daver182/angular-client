'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('MainCtrl', function ($scope, Evaluacion, Autocomplete) {
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

		if($scope.filtro.trabajador){
			query.trabajador = $scope.filtro.trabajador.id;
		}

		if($scope.filtro.fecha_evaluacion_desde){
			query.fecha_evaluacion_desde = $scope.filtro.fecha_evaluacion_desde;
		}

		if($scope.filtro.fecha_evaluacion_hasta){
			query.fecha_evaluacion_hasta = $scope.filtro.fecha_evaluacion_hasta;
		}

		if($scope.filtro.mandante){
			query.mandante = $scope.filtro.mandante.id;
		}

		if($scope.filtro.contratista){
			query.contratista = $scope.filtro.contratista.id;
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

	$scope.empresas = [];
	$scope.cargarEmpresas = function(nombre) {
		Autocomplete.buscarEmpresa($scope, 'empresas', nombre);
	};

    $scope.trabajadores = [];
	$scope.cargarTrabajadores = function(nombre) {
		Autocomplete.buscarTrabajador($scope, 'trabajadores', nombre);
	};
});
