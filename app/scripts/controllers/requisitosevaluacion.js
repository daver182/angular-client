'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:RequisitosevaluacionCtrl
 * @description
 * # RequisitosevaluacionCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('RequisitosevaluacionCtrl', function ($scope, $stateParams, Trabajador, Evaluacion, Requisito, Estadorequisito, $http, $state, Toast, Upload, notificationService) {
    if($stateParams.id){
		$scope.evaluacion = Evaluacion.get({ id: $stateParams.id }, function(){
			console.log($scope.evaluacion.trabajador.fecha_nacimiento);
			var fechaNacimiento = new Date($scope.evaluacion.trabajador.fecha_nacimiento.split('/')[2], $scope.evaluacion.trabajador.fecha_nacimiento.split('/')[1], $scope.evaluacion.trabajador.fecha_nacimiento.split('/')[0]);
			var hoy = new Date();

			$scope.evaluacion.trabajador.edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
			$scope.requisitosEvaluacion = Evaluacion.verRequisitos({ id: $scope.evaluacion.id }, function(a){});
			$scope.requisitos = Requisito.query();
			$scope.estadoRequisito = Estadorequisito.query();
		});
	}else{
		$state.go('home.evaluaciones');
	}

	$scope.avatar = {};

	$scope.agregarRequisito = function(){
		var today = new Date();
		$scope.requisitosEvaluacion.push({
			requisito: '1',
			estado: '1',
			archivoSeleccionado: false,
			subido: false,
			vigencia: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
		})
	}

	$scope.rutaBase = window.URL + '/';

	$scope.archivoSeleccionado = function(files, event, requisitoEvaluacion){
		if(files[0]){
			var file = files[0];
			requisitoEvaluacion.archivoSeleccionado = true;
			requisitoEvaluacion.nombreArchivo = file.name;
		}
	}

	function guardarRequisitos(fn){
		if($scope.requisitosEvaluacion.length !== 0){
			async.each($scope.requisitosEvaluacion, function(requisitoEvaluacion, cb){
				if(requisitoEvaluacion.archivo){
					requisitoEvaluacion.upload = Upload.upload({
						url: window.URL + '/evaluacion/' + $scope.evaluacion.id + '/requisitos',
						fields: { 'requisito': requisitoEvaluacion },
						file: requisitoEvaluacion.archivo
					});

					requisitoEvaluacion.upload.progress(function(evt) {
						requisitoEvaluacion.subiendo = true;
						requisitoEvaluacion.progreso = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
						requisitoEvaluacion.width = requisitoEvaluacion.progreso + '%';
					});

					requisitoEvaluacion.upload.success(function(evt) {
						requisitoEvaluacion.subiendo = false;
						requisitoEvaluacion.cargado = true;
						cb(null);
					});
				}else{
					cb(null);
				}

				
			}, function(err){
				if(err) fn(false, err);
				
				fn(true);
			});
		}
	}

	$scope.borrarRequisito = function($index){
		notificationService.notifyWithDefaults({
			title: '¿Borrar el requisito seleccionado?',
			text: '¿Esta seguro que desea borrar el requisito seleccionado?',
			type: 'error',
			confirm: {
				confirm: true,
				buttons: [
					{
						text: "OK",
						click: function(notice, value){
							notice.remove();
							notice.get().trigger("pnotify.confirm", [notice, value]);
							console.log($index);
							eliminarRequisito($index);

						}
					}
				]
			}
		});
		
	}

	function eliminarRequisito(index){
		var requisito = $scope.requisitosEvaluacion[index];
		console.log(requisito);
		Evaluacion.borrarRequisito({
			id: $scope.evaluacion.id,
			idRequisitoEvaluacion: requisito.id
		});
		$scope.requisitosEvaluacion.splice(index, 1);

	}

	$scope.guardarEvaluacion = function(){
		if(!verificarUnico($scope.requisitosEvaluacion)){
			return Toast.error('Los requisitos no pueden repetirse')
		}

		guardarRequisitos(function(result){
			console.log(result);
			if(result){
				$scope.evaluacion.$update({ step: '2' },function(evaluacion){
					if(evaluacion){
						Toast.success('Datos guardados', 'Los datos fueron guardados correctamente');
						$state.go('home.habilitacionesEvaluacion', { id: evaluacion[0] });
					}else{
						Toast.error('Ocurrio un error al guardar. Intentelo de nuevo.');
					}
				});
			}else{
				Toast.error('No se pudieron guardar los requisitos');
			}
		});
		
		
	}

	function verificarUnico(requisitos){
		var presentes = [];
		for (var i = 0; i < requisitos.length; i++) {
			if(presentes[requisitos[i].requisito]) return false;
			presentes[requisitos[i].requisito] = true;
		};

		return true;
	}

	$scope.subirAvatar = function(files, e){
		if(files.length !== 0){
			$scope.avatar.upload = Upload.upload({
				url: window.URL + '/trabajador/' + $scope.evaluacion.trabajador.id + '/avatar',
				file: files[0]
			});

			$scope.avatar.upload.progress(function(evt) {
				$scope.avatar.subiendo = true;
			});

			$scope.avatar.upload.success(function(evt) {
				$scope.avatar.subiendo = false;
				var random = (new Date()).toString();
   				$scope.evaluacion.trabajador.imagen = evt.imagen + "?cb=" + random;
			});
		}
	}
});