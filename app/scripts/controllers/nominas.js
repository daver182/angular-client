'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:NominasCtrl
 * @description
 * # NominasCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('NominasCtrl', function ($scope, ngTableParams, Evaluacion) {
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

        //console.log($scope.tableParams);

        filtered = true;
        $scope.tableParams.reload();
	}
});
