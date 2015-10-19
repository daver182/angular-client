'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:ResumenCtrl
 * @description
 * # ResumenCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('ResumenCtrl', function ($scope, $stateParams, Trabajador, Evaluacion, Requisito, Estadorequisito, $state, Toast, Habilidad, Habilitacion, Role) {
    if($stateParams.id){
    	$scope.evaluacion = Evaluacion.get({ id: $stateParams.id }, function(){
			$scope.trabajador = Trabajador.get({ id:  $scope.evaluacion.trabajadorId }, function(){
				var fechaNacimiento = new Date($scope.trabajador.fecha_nacimiento);
				var hoy = new Date();

				$scope.trabajador.edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
			});

			$scope.evaluacion.fechaVigencia = new Date($scope.evaluacion.fecha_vigencia);
    		$scope.evaluacion.fechaEvaluacion = new Date($scope.evaluacion.fecha_evaluacion);

			$scope.requisitosEvaluacion = Evaluacion.verRequisitos({ id: $scope.evaluacion.id, type: 'resumen' }, function(a){});
			$scope.habilitaciones = Evaluacion.verTodasHabilitaciones({id: $scope.evaluacion.id, type: 'resumen' });
		});
	}else{
		$state.go('home.evaluaciones');
	}

	$scope.rutaDocumentos = window.URL;
	$scope.rutaBase = window.URL + '/adjuntos/trabajadores/';

	$scope.currentTab = 'home';
});