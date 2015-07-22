'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:TrabajadoresCtrl
 * @description
 * # TrabajadoresCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('TrabajadorCtrl', function ($scope, ngTableParams, Trabajador, notificationService, $timeout, Role) {
	$scope.tipoUsuario = Role.get();

	$scope.tableParams = new ngTableParams({
		page: 1,
		count: 10,
		sorting: {
			nombres: 'desc'
		}
	}, {
		total: 0,
		getData: function($defer, params) {
			var parametros = params.url();
			
			var trabajadores = Trabajador.query(parametros);
			trabajadores.$promise.then(function(data){
				params.total(data.total);
				$defer.resolve(data.data);
			});
		}
	});

	$scope.borrar = function(id){
		notificationService.notifyWithDefaults({
			title: '¿Borrar el trabajador seleccionado?',
			text: 'Esta seguro que desea borrar el trabajador seleccionado?',
			type: 'error',
			confirm: {
				confirm: true,
				buttons: [
					{
						text: "Ok",
						click: function(notice, value){
							notice.remove();
							notice.get().trigger("pnotify.confirm", [notice, value]);
							borrarTrabajador(id);
						}
					}
				]
			}
		});
	}

	function borrarTrabajador(id){
		var resource = new Trabajador({id: id});
		resource.$delete(function(trabajador){
			if(trabajador){
				notificationService.notifyWithDefaults({
					title: 'Trabajador eliminado',
					text: 'El trabajador fue eliminado correctamente',
					type: 'success'
				});

				$timeout(function(){
					$scope.tableParams.reload();
				}, 1000);
				
			}else{
				notificationService.notifyWithDefaults({
					title: 'Ha ocurrido un error',
					text: 'Intente eliminar el trabajador nuevamente.',
					type: 'error'
				});
			}
		});
	}
});
