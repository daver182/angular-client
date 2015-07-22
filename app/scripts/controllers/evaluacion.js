'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:EvaluacionCtrl
 * @description
 * # EvaluacionCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('EvaluacionCtrl', function ($scope, ngTableParams, Evaluacion, notificationService, $timeout) {
    $scope.tableParams = new ngTableParams({
		page: 1,
		count: 2,
		sorting: {
			nombres: 'desc'
		}
	}, {
		total: 0,
		getData: function($defer, params) {
			var parametros = params.url();
			var evaluaciones = Evaluacion.query(parametros);
			evaluaciones.$promise.then(function(data){
				params.total(data.total);
				$defer.resolve(data.data);
			});
		}
	});

	$scope.borrar = function(id){
		notificationService.notifyWithDefaults({
			title: '¿Borrar la empresa seleccionada?',
			text: 'Esta seguro que desea borrar la empresa seleccionada?',
			type: 'error',
			confirm: {
				confirm: true,
				buttons: [
					{
						text: "Ok",
						click: function(notice, value){
							notice.remove();
							notice.get().trigger("pnotify.confirm", [notice, value]);
							borrarEmpresa(id);
						}
					}
				]
			}
		});
	}

	function borrarEmpresa(id){
		var resource = new Empresa({id: id});
		resource.$delete(function(empresa){
			if(empresa){
				notificationService.notifyWithDefaults({
					title: 'Empresa eliminada',
					text: 'La empresa fue eliminada correctamente',
					type: 'success'
				});

				$timeout(function(){
					$scope.tableParams.reload();
				}, 1000);
				
			}else{
				notificationService.notifyWithDefaults({
					title: 'Ha ocurrido un error',
					text: 'Intente eliminar la empresa nuevamente.',
					type: 'error'
				});
			}
		});
	}
  });
