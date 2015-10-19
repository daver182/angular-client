'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:DetallecontratoCtrl
 * @description
 * # DetallecontratoCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('DetallecontratoCtrl', function ($scope, $http, $stateParams, Empresa, Contrato, Toast, $state, Autocomplete, Fecha) {
    $scope.submitted = false;
    $scope.empresaValida = true;

    $scope.select = { empresa: {} };

	if($stateParams.id){
		$scope.contrato = Contrato.get({ id: $stateParams.id }, function(){
			$scope.select.empresa = $scope.contrato.mandante;
		});
	}else{
		$scope.contrato = new Contrato();
	}

	$scope.guardarContrato = function(isValid){
		console.log($scope.select.empresa);
		if(!$scope.select.empresa) {
			return $scope.empresaValida = false;
		}
		$scope.empresaValida = true;

		$scope.contrato.mandante = $scope.select.empresa.id;

        $scope.contrato.fecha_inicio = Fecha.transformar($scope.contrato.fecha_inicio);
        $scope.contrato.fecha_termino = Fecha.transformar($scope.contrato.fecha_termino);
        //$scope.contrato.fecha_inicio = $scope.contrato.fecha_inicio.split('/')[2] + '-' + ($scope.contrato.fecha_inicio.split('/')[1]) + '-' + $scope.contrato.fecha_inicio.split('/')[0];
        //$scope.contrato.fecha_termino = $scope.contrato.fecha_termino.split('/')[2] + '-' + ($scope.contrato.fecha_termino.split('/')[1]) + '-' + $scope.contrato.fecha_termino.split('/')[0];

		$scope.submitted = true;
		if(isValid){
			$scope.contrato.$save().then(function(contrato){
				Toast.success('Datos guardados', 'El contrato ha sido guardado correctamente');
				$state.go('home.contratistasContrato', { id: contrato.id });
			}, function(err){
				Toast.error('El contrato no pudo se guardado', 'Ocurrió un error');
			});
		}
	}

	$scope.empresas = [];
	$scope.cargarEmpresas = function(nombre) {
		Autocomplete.buscarEmpresa($scope, 'empresas', nombre);
	};

	$scope.cargarFaenas = function(query){
		return $http.get(window.URL + '/faena/buscar?texto=' + query);
	}

	$scope.validar = function(field){
		return $scope.formularioContrato[field].$invalid && !$scope.formularioContrato[field].$pristine;
	}
});
