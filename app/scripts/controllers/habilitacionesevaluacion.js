'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:HabilitacionesevaluacionCtrl
 * @description
 * # HabilitacionesevaluacionCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('HabilitacionesevaluacionCtrl', function ($scope, $stateParams, Trabajador, Evaluacion, Requisito, Estadorequisito, $http, $state, Toast, Upload, notificationService, Habilidad, Habilitacion) {
	if($stateParams.id){
		$scope.evaluacion = Evaluacion.get({ id: $stateParams.id }, function(){
			var fechaNacimiento = new Date($scope.evaluacion.trabajador.fecha_nacimiento.split('/')[2], $scope.evaluacion.trabajador.fecha_nacimiento.split('/')[1], $scope.evaluacion.trabajador.fecha_nacimiento.split('/')[0]);
			var hoy = new Date();

			$scope.evaluacion.trabajador.edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
			$scope.requisitosEvaluacion = Evaluacion.verRequisitos({ id: $scope.evaluacion.id }, function(a){});
			$scope.habilitaciones = Evaluacion.verHabilitaciones({id: $scope.evaluacion.id });
			$scope.restricciones = Evaluacion.verRestricciones({id: $scope.evaluacion.id });
		});
	}else{
		$state.go('home.evaluaciones');
	}

	$scope.rutaBase = window.URL + '/adjuntos/trabajadores/';

	//TODO: Ver como excluir items de una lista en la otra, para el autocompletado
	$scope.buscarHabilidades = function(query){
		return $http.get(window.URL + '/habilidad/buscar?texto=' + query);
	}

	$scope.addHabilitacion = function(tag){
		Evaluacion.guardarHabilitacion({
			id: $scope.evaluacion.id,
			habilitado: true,
			habilidad_id: tag.id
		}, function(data){
			tag.id = data.id;
			tag.habilidad_id = data.habilidad_id;
		});
	}

	$scope.removeHabilitacion = function(tag){
		Evaluacion.borrarHabilitacion({
			id: $scope.evaluacion.id,
			idHabilitacion: tag.id
		}, function(data){
			console.log(data);
		});
	}

	$scope.addRestriccion = function(tag){
		Evaluacion.guardarHabilitacion({
			id: $scope.evaluacion.id,
			habilitado: false,
			habilidad_id: tag.id
		}, function(data){
			tag.id = data.id;
			tag.habilidad_id = data.habilidad_id;
		});
	}

	$scope.removeRestriccion = function(tag){
		Evaluacion.borrarHabilitacion({
			id: $scope.evaluacion.id,
			idHabilitacion: tag.id
		}, function(data){
			console.log(data);
		});
	}
});