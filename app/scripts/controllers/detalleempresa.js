'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:DetalleempresaCtrl
 * @description
 * # DetalleempresaCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('DetalleempresaCtrl', function ($scope, $http, $stateParams, Empresa, notificationService, $location, Upload) {
	$scope.submitted = false;
	$scope.logo = {};
	$scope.rutaBase = window.URL + '/';

	if($stateParams.id){
		$scope.empresa = Empresa.get({id: $stateParams.id});
	}else{
		$scope.empresa = new Empresa();
	}

	$scope.guardarEmpresa = function(isValid){
		$scope.submitted = true;
		if (isValid) {
			if($scope.empresa.id){
				$scope.empresa.$update(function(empresa){
					if(empresa){
						$scope.empresa = empresa;
						
						notificationService.notifyWithDefaults({
							title: 'Datos guardados',
							text: 'Los datos fueron guardados correctamente',
							type: 'success'
						});
					}else{
						notificationService.notifyWithDefaults({
							title: 'Ocurrió un error',
							text: 'Ocurrio un error al guardar. Intentelo de nuevo.',
							type: 'error'
						});
					}
				});
			}else{
				$scope.empresa.$save(function(empresa){
					if(empresa){
						$scope.empresa = empresa;
						notificationService.notifyWithDefaults({
							title: 'Datos guardados',
							text: 'La empresa ha sido creada con exito.',
							type: 'success'
						});

						$location.path("/empresas/detalle/" + empresa.id);
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

	$scope.validar = function(field){
		return $scope.formularioEmpresa[field].$invalid && !$scope.formularioEmpresa[field].$pristine;
	}

	$scope.subirLogo = function(files, e){
		if(files.length !== 0){
			$scope.logo.upload = Upload.upload({
				url: window.URL + '/empresa/' + $scope.empresa.id + '/logo',
				file: files[0]
			});

			$scope.logo.upload.progress(function(evt) {
				$scope.logo.subiendo = true;
			});

			$scope.logo.upload.success(function(evt) {
				$scope.logo.subiendo = false;
				var random = (new Date()).toString();
   				$scope.empresa.logo = evt.logo + "?cb=" + random;
			});
		}
	}
});
