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
			var fechaNacimiento = new Date($scope.evaluacion.trabajador.fecha_nacimiento.split('/')[2], $scope.evaluacion.trabajador.fecha_nacimiento.split('/')[1], $scope.evaluacion.trabajador.fecha_nacimiento.split('/')[0]);
			var hoy = new Date();

			$scope.evaluacion.fechaVigencia = new Date(
				$scope.evaluacion.fecha_vigencia.split('/')[2],
				$scope.evaluacion.fecha_vigencia.split('/')[1] - 1,
				$scope.evaluacion.fecha_vigencia.split('/')[0]
			);

			console.log($scope.evaluacion.fecha_evaluacion);
			$scope.evaluacion.fechaEvaluacion = new Date(
				$scope.evaluacion.fecha_evaluacion.split('/')[2],
				$scope.evaluacion.fecha_evaluacion.split('/')[1] - 1,
				$scope.evaluacion.fecha_evaluacion.split('/')[0]
			);

			$scope.evaluacion.trabajador.edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
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