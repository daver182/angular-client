'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:NominasCtrl
 * @description
 * # NominasCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('NominasCtrl', function ($scope, ngTableParams, Evaluacion, Autocomplete) {
    $scope.filtro = {};
    $scope.resultados = false;
    var filtered = false;
    var query = {};

    $scope.tableParams = new ngTableParams({
		page: 1,
		count: 10,
		sorting: {
			nombres: 'desc'
		}
	}, {
		total: 0,
		getData: function($defer, params) {
            if(filtered){
    			var parametros = params.url();
                query.page = parametros.page;
                query.count = parametros.count;
                query.type = 'nomina';

    			var nomina = Evaluacion.query(query);
    			nomina.$promise.then(function(data){
                    if(data.total !== 0) $scope.resultados = true;
    				params.total(data.total);
    				$defer.resolve(data.data);
    			});
            }
		}
	});

    $scope.filtrar = function(){
        $scope.resultados = false;
        query = {};

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

        filtered = true;
        $scope.tableParams.reload();
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
