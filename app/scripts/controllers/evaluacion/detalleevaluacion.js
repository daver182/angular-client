'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:DetalleevaluacionCtrl
 * @description
 * # DetalleevaluacionCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('DetalleevaluacionCtrl', function ($scope, $stateParams, Trabajador, Evaluacion, $http, $state, Toast, Autocomplete, Fechas) {
	$scope.submitted = false;

	$scope.empresaValida = true;
	$scope.empresaBloqueada = false;
	$scope.contratoValido = true;
	$scope.faenasValido = true;

	$scope.select = { empresa: {} };

	if($stateParams.id){
		$scope.evaluacion = Evaluacion.get({ id: $stateParams.id }, function(){
			console.log($scope.evaluacion);
			//$scope.evaluacion.trabajador = $scope.evaluacion.trabajador;

			$scope.trabajador = Trabajador.get({ id:  $scope.evaluacion.trabajadorId }, function(){
				//console.log($scope.trabajador);
				$scope.select.empresa = $scope.trabajador.empresa;
				//$scope.empresaBloqueada = true;

				$scope.cargarContratos('');
				
			});

			$scope.select.contrato = $scope.evaluacion.contrato;
			$scope.contratoValido = true;
		});
	}else{
		$scope.evaluacion = new Evaluacion();
		$scope.evaluacion.contrato = {};
		$scope.evaluacion.trabajador = {
			sexo: 'Masculino'
		}
	}

	$scope.$watch('select.empresa', function(newValue, oldValue){
		console.log(newValue, oldValue);
		if(newValue && oldValue){
			if(newValue.id && oldValue.id){
				$scope.contratos = [];
				$scope.select.contrato = {};
				$scope.cargarContratos('');
			}

			return;
		}

		if(newValue){
			$scope.cargarContratos('');
		}

		if(oldValue && oldValue.id){
			$scope.contratos = [];
			$scope.select.contrato = {};
		}else if(newValue){
			$scope.cargarContratos('');
		}
	});

	$scope.$watch('select.contrato', function(newValue,oldValue){
		if(oldValue){
			$scope.evaluacion.faenas = [];
		}
	});

	

    $scope.buscarTrabajador = function(){
    	if($scope.trabajador){
    		$scope.trabajador = Trabajador.buscar({ rut: $scope.trabajador.rut } , function(data){
    			if(data){
    				$scope.trabajador = data;

    				$scope.select.empresa = $scope.trabajador.empresa;
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

    $scope.guardarEvaluacion = function(isValid){
		if(!$scope.select.empresa) {
			return $scope.empresaValida = false;
		}
		if(!$scope.select.contrato) {
			return $scope.contratoValido = false;
		}
		if(!$scope.evaluacion.faenas.length != 0) {
			return $scope.faenasValido = false;
		}
		$scope.empresaValida = true;
		$scope.contratoValido = true;
		$scope.faenasValido = true;

		$scope.trabajador.empresa_id = $scope.select.empresa.id;
		$scope.evaluacion.contrato_id = $scope.select.contrato.id;
		$scope.evaluacion.trabajador_id = $scope.trabajador.id;

		$scope.evaluacion.fecha_evaluacion = Fechas.transformar($scope.evaluacion.fecha_evaluacion);
		$scope.evaluacion.fecha_vigencia = Fechas.transformar($scope.evaluacion.fecha_vigencia);

		$scope.submitted = true;
		if (isValid) {
			$scope.evaluacion.$save().then(function(evaluacion){
				Toast.success('Datos guardados', 'Los datos fueron guardados correctamente');
				
				$scope.trabajador.$save().then(function(trabajador){
					$state.go('home.requisitosEvaluacion', { id: evaluacion.id });
				});
			}, function(err){
				Toast.error('Ocurrio un error al guardar. Intentelo de nuevo.', 'Ocurrió un error');
			});
		}
	}



    $scope.cargarFaenas = function(query){
    	return $http.get(window.URL + '/faena_contratista/buscar?empresa=' + $scope.select.empresa.id + '&contrato=' + $scope.select.contrato.id + '&texto=' + query);
	}

	$scope.cargarLicencias = function(query){
		return $http.get(window.URL + '/licencia/buscar?texto=' + query);
	}

	$scope.empresas = [];
	$scope.cargarEmpresas = function(nombre) {
		Autocomplete.buscarEmpresa($scope, 'empresas', nombre);
	};

	$scope.contratos = [];
	$scope.cargarContratos = function(nombre) {
		if($scope.select.empresa.id){
			Autocomplete.buscarContratos($scope, 'contratos', $scope.select.empresa.id, nombre);
		}
	};

	function buscarContratos(id, nombre){
		console.log(id);
		if(id){
			return Autocomplete.buscarContratos($scope, 'contratos', id, nombre);
		}

		setTimeout(function(){
			buscarContratos($scope.select.empresa.id, nombre);
		}, 500);
	}

	$scope.validar = function(field){
		return $scope.formularioEvaluacion[field].$invalid && !$scope.formularioEvaluacion[field].$pristine;
	}
    


    /*$scope.cargarFaenas = function(query){
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
	}*/

	
});