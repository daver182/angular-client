'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:DetalletrabajadorCtrl
 * @description
 * # DetalletrabajadorCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('DetalletrabajadorCtrl', function ($scope, $http, $stateParams, Trabajador, $location, Role, $state, Toast, Autocomplete) {
	$scope.submitted = false;
	$scope.empresaValida = true;
	$scope.role = Role.get();

	if($stateParams.id){
		$scope.disabled = true;
		$scope.trabajador = Trabajador.get({id: $stateParams.id}, function(){
			$scope.empresaSeleccionada = $scope.trabajador.empresa;
		}, function(response){
			if(response.status === 403){
				$state.go('home.trabajadores');
				Toast.error(response.data, 'Acceso denegado');
			}
		});
	}else{
		$scope.trabajador = new Trabajador();
		$scope.trabajador.sexo = 'Masculino';
	}

	$scope.guardarTrabajador = function(isValid){
		$scope.empresaValida = true;
		if(!$scope.empresaSeleccionada) {
			return $scope.empresaValida = false;
		}

		$scope.trabajador.empresa = $scope.empresaSeleccionada.id;

		$scope.submitted = true;
		if (isValid) {
			if($scope.trabajador.id){
				$scope.trabajador.$update(function(trabajador){
					if(trabajador){
						$scope.trabajador = trabajador;
						Toast.success('Los datos fueron guardados correctamente', 'Datos guardados');
					}else{
						Toast.error('Ocurrio un error al guardar. Intentelo de nuevo.', 'Ocurrió un error');
					}
				});
			}else{
				$scope.trabajador.$save(function(trabajador){
					console.log(trabajador);
					if(trabajador){
						$scope.trabajador = trabajador;
						Toast.success('El trabajador ha sido creado con exito.', 'Datos guardados');

						$location.path("/trabajadores/detalle/" + trabajador.id);
					}else{
						Toast.error('Ocurrio un error al guardar. Intentelo de nuevo.', 'Ocurrió un error');
					}
				}, function(result){
					var errores = '';
					for(var error in result.data){
						errores = errores + ' ' + result.data[error] + '<br />';
					}
					console.log(errores);

					Toast.error(errores, 'Los datos ingresados son incorrectos');
				});
			}
		}
	}

	$scope.cargarLicencias = function(query){
		return $http.get(window.URL + '/licencia/buscar?texto=' + query);
	}

	$scope.validar = function(field){
		return $scope.formularioTrabajador[field].$invalid && !$scope.formularioTrabajador[field].$pristine;
	}

	/*$scope.empresas = [];
	$scope.cargarEmpresas = function(nombre) {
		Autocomplete.buscarEmpresa($scope, nombre);
	};*/

});
