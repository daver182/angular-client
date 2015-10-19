'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:DetalleempresaCtrl
 * @description
 * # DetalleempresaCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('DetalleempresaCtrl', function ($scope, $http, $stateParams, Empresa, $location, Upload, Toast) {
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
			$scope.empresa.$save().then(function(empresa) {
				Toast.success('Datos guardados', 'La empresa ha sido guardada correctamente');
				$location.path("/empresas/detalle/" + empresa.id);
			}, function(err){
				Toast.error('La empresa no puedo ser guardada', 'Ocurrió un error');
			});
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
