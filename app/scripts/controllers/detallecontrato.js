'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:DetallecontratoCtrl
 * @description
 * # DetallecontratoCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('DetallecontratoCtrl', function ($scope, $http, $stateParams, Empresa, Contrato, notificationService, $state) {
    $scope.submitted = false;
    $scope.empresaValida = true;

    $scope.dateOptions = {
    	format: 'yyyy/dd/mm'
    }

	if($stateParams.id){
		$scope.contrato = Contrato.get({ id: $stateParams.id }, function(){
			$scope.empresaSeleccionada = $scope.contrato.mandante.id;
		});
	}else{
		$scope.contrato = new Contrato();
	}

	$scope.guardarContrato = function(isValid){
		if(!$scope.empresaSeleccionada) {
			return $scope.empresaValida = false;
		}
		$scope.empresaValida = true;
		
		if($scope.empresaSeleccionada.originalObject) {
			$scope.contrato.mandante = $scope.empresaSeleccionada.originalObject.id
		}else{
			$scope.contrato.mandante = $scope.empresaSeleccionada;
		}

		//console.log($scope.contrato);
		$scope.submitted = true;
		if (isValid) {
			if($scope.contrato.id){
				$scope.contrato.$update(function(contrato){
					if(contrato){
						$scope.contrato = contrato;
						
						notificationService.notifyWithDefaults({
							title: 'Datos guardados',
							text: 'Los datos fueron guardados correctamente',
							type: 'success'
						});

						$state.go('home.contratistasContrato', { id: contrato.id });
					}else{
						notificationService.notifyWithDefaults({
							title: 'Ocurrió un error',
							text: 'Ocurrio un error al guardar. Intentelo de nuevo.',
							type: 'error'
						});
					}
				});
			}else{
				$scope.contrato.$save(function(contrato){
					if(contrato){
						$scope.contrato = contrato;
						notificationService.notifyWithDefaults({
							title: 'Datos guardados',
							text: 'El contrato ha sido creado con exito.',
							type: 'success'
						});

						$state.go('home.detalleContrato', { id: contrato.id });
					}else{
						notificationService.notifyWithDefaults({
							title: 'Ocurrió un error',
							text: 'Ocurrio un error al guardar. Intentelo de nuevo.',
							type: 'error'
						});
					}
				});
			}
		}
	}

	$scope.cargarFaenas = function(query){
		return $http.get(window.URL + '/faena/buscar?texto=' + query);
	}

	$scope.validar = function(field){
		return $scope.formularioContrato[field].$invalid && !$scope.formularioContrato[field].$pristine;
	}
});