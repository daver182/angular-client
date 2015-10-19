'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:PerfilCtrl
 * @description
 * # PerfilCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('PerfilCtrl', function ($scope, Perfil, Toast) {
    $scope.perfil = Perfil.get(function() {
    	$scope.perfil.confirm = $scope.perfil.password;
    });

    $scope.guardarPerfil = function(isValid){
		$scope.submitted = true;

		if($scope.perfil.password !== $scope.perfil.confirm) {
			Toast.error('Las contraseñas no coinciden', 'Error');
			return;
		}

		if (isValid) {
			if($scope.perfil.id){
				$scope.perfil.$update(function(perfil){
					if(perfil){
						$scope.perfil = perfil;
						$scope.perfil.confirm = $scope.perfil.password;

						Toast.success('Los datos fueron guardados correctamente', 'Datos guardados');
					}else{
						Toast.error('Ocurrio un error al guardar. Intentelo de nuevo.', 'Ocurrió un error');
					}
				});
			}
		}
	}

	$scope.validar = function(field){
		return $scope.formularioPerfil[field].$invalid && !$scope.formularioPerfil[field].$pristine;
	}
});