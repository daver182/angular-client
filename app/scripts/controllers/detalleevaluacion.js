'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:DetalleevaluacionCtrl
 * @description
 * # DetalleevaluacionCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('DetalleevaluacionCtrl', function ($scope, $stateParams, Trabajador, Evaluacion, $http, $state, Toast) {
	$scope.submitted = false;

	$scope.empresaValida = true;
	$scope.contratoValido = true;
	$scope.faenasValido = true;

	if($stateParams.id){
		$scope.evaluacion = Evaluacion.get({id: $stateParams.id}, function(){
			$scope.evaluacion.trabajador = $scope.evaluacion.trabajador;

			$scope.empresaSeleccionada = $scope.evaluacion.trabajador.empresa.id;
			$scope.empresaBloqueada = true;

			$scope.contratoSeleccionado = $scope.evaluacion.contrato.id;
			$scope.contratoValido = true;
		});
	}else{
		$scope.evaluacion = new Evaluacion();
		$scope.evaluacion.contrato = {};
		$scope.evaluacion.trabajador = {
			sexo: 'Masculino'
		}
	}

	$scope.$watch('empresaSeleccionada', function(newValue,oldValue){
		if(newValue){
			var id;
			if(typeof newValue === 'string'){
				id = newValue;
			}else if(typeof newValue === 'object'){
				id = newValue.originalObject.id
			}

			$scope.queryBuscarContratos = 'http://preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com/public/contrato/buscar?type=evaluacion&empresa=' + id + '&texto=';
		}
			
	});
	$scope.empresaBloqueada = false;

    $scope.buscarTrabajador = function(){
    	if($scope.evaluacion.trabajador){
    		$scope.trabajador = Trabajador.buscar({ rut: $scope.evaluacion.trabajador.rut } , function(data){
    			if(data){
    				$scope.evaluacion.trabajador = data;

    				$scope.empresaSeleccionada = $scope.evaluacion.trabajador.empresa.id;
    				$scope.empresaBloqueada = true;
					$scope.empresaValida = true;

	    			if($scope.evaluacion.contrato) $scope.evaluacion.contrato.denominacion = '';
	    			$scope.contratoSeleccionado = false;
	    			$scope.contratoValido = true;

					$scope.evaluacion.faenas = false;
				}else{
					Toast.error('El Rut ingresado no corresponde a ningun trabajador', 'No encontrado')

    				$scope.empresaBloqueada = false;
				}
    		});
    	}
    }

    $scope.cargarFaenas = function(query){
    	var idEmpresa;
    	var idContrato;
    	if(typeof $scope.empresaSeleccionada === 'string'){
			idEmpresa = $scope.empresaSeleccionada;
		}else if(typeof $scope.empresaSeleccionada === 'object'){
			idEmpresa = $scope.empresaSeleccionada.originalObject.id
		}

		if(typeof $scope.contratoSeleccionado === 'string'){
			idContrato = $scope.contratoSeleccionado;
		}else if(typeof $scope.contratoSeleccionado === 'object'){
			idContrato = $scope.contratoSeleccionado.originalObject.id
		}
		return $http.get(window.URL + '/faena_contratista/buscar?empresa=' + idEmpresa + '&contrato=' + idContrato + '&texto=' + query);
	}

	$scope.cargarLicencias = function(query){
		return $http.get(window.URL + '/licencia/buscar?texto=' + query);
	}

	$scope.guardarEvaluacion = function(isValid){
		if(!$scope.empresaSeleccionada) {
			return $scope.empresaValida = false;
		}
		if(!$scope.contratoSeleccionado) {
			return $scope.contratoValido = false;
		}
		if(!$scope.evaluacion.faenas.length != 0) {
			console.log($scope.evaluacion.faenas, $scope.faenasValido);
			return $scope.faenasValido = false;
		}
		$scope.empresaValida = true;
		$scope.contratoValido = true;
		$scope.faenasValido = true;

		if($scope.empresaSeleccionada.originalObject) {
			$scope.evaluacion.trabajador.empresa_id = $scope.empresaSeleccionada.originalObject.id
		}else{
			$scope.evaluacion.trabajador.empresa_id = $scope.empresaSeleccionada;
		}

		if($scope.contratoSeleccionado.originalObject) {
			$scope.evaluacion.contrato_id = $scope.contratoSeleccionado.originalObject.id
		}else{
			$scope.evaluacion.contrato_id = $scope.contratoSeleccionado;
		}

		$scope.submitted = true;
		if (isValid) {
			if($scope.evaluacion.id){
				$scope.evaluacion.$update(function(evaluacion){
					if(evaluacion){
						Toast.success('Datos guardados', 'Los datos fueron guardados correctamente');
						$state.go('home.requisitosEvaluacion', { id: evaluacion[0] });
					}else{
						Toast.error('Ocurrio un error al guardar. Intentelo de nuevo.')
					}
				});
			}else{
				$scope.evaluacion.$save(function(evaluacion){
					if(evaluacion){
						Toast.success('Datos guardados', 'La evaluación ha sido creada con exito.');
						$state.go('home.requisitosEvaluacion', { id: evaluacion[0] });
					}else{
						Toast.error('Ocurrio un error al guardar. Intentelo de nuevo.')
					}
				}, function(result){
					console.log(result);
					var errores = '';
					for(var error in result.data){
						errores = errores + ' ' + result.data[error] + '<br />';
					}
					Toast.error(errores);
				});
			}
		}
	}

	$scope.validar = function(field){
		return $scope.formularioEvaluacion[field].$invalid && !$scope.formularioEvaluacion[field].$pristine;
	}
});