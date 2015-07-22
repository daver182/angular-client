'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:DetalleusuarioCtrl
 * @description
 * # DetalleusuarioCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('DetalleusuarioCtrl', function ($scope, $http, $stateParams, Usuario, TipoUsuario, Toast, $location, Autocomplete) {
	$scope.submitted = false;

	$scope.tiposUsuario = TipoUsuario.query();

	if($stateParams.id){
		$scope.usuario = Usuario.get({id: $stateParams.id});
	}else{
		$scope.usuario = new Usuario();
	}

	$scope.guardarUsuario = function(isValid){
		$scope.submitted = true;
		if($scope.empresaSeleccionada){
			$scope.usuario.empresa_id = $scope.empresaSeleccionada.id;
		}

		if (isValid) {
			if($scope.usuario.id){
				$scope.usuario.$update(function(usuario){
					if(usuario){
						$scope.usuario = usuario;

						Toast.success('Los datos fueron guardados correctamente', 'Datos guardados');
					}else{
						Toast.error('Ocurrio un error al guardar. Intentelo de nuevo.', 'Ocurrió un error');
					}
				});
			}else{
				$scope.usuario.$save(function(usuario){
					if(usuario){
						$scope.usuario = usuario;
						Toast.success('El usuario ha sido creado con exito.', 'Datos guardados');

						$location.path("/usuarios/detalle/" + usuario.id);
					}else{
						Toast.error('Ocurrio un error al guardar. Intentelo de nuevo.', 'Ocurrió un error');
					}
				});
			}
		}
	}

	$scope.validar = function(field){
		return $scope.formularioUsuario[field].$invalid && !$scope.formularioUsuario[field].$pristine;
	}

	$scope.empresas = [];
	$scope.cargarEmpresas = function(nombre) {
		Autocomplete.buscarEmpresa($scope, nombre);
	};
});
