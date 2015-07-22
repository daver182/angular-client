'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:UsuarioCtrl
 * @description
 * # UsuarioCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('UsuarioCtrl', function ($scope, ngTableParams, Usuario, notificationService, $timeout) {
	$scope.tableParams = new ngTableParams({
		page: 1,
		count: 10,
		sorting: {
			nombre: 'desc'
		}
	}, {
		total: 0,
		getData: function($defer, params) {
			var parametros = params.url();
			
			var usuarios = Usuario.query(parametros);
			usuarios.$promise.then(function(data){
				params.total(data.total);
				$defer.resolve(data.data);
			});
		}
	});

	$scope.borrar = function(id){
		notificationService.notifyWithDefaults({
			title: '¿Borrar el usuario seleccionado?',
			text: 'Esta seguro que desea borrar el usuario seleccionado?',
			type: 'error',
			confirm: {
				confirm: true,
				buttons: [
					{
						text: "Ok",
						click: function(notice, value){
							notice.remove();
							notice.get().trigger("pnotify.confirm", [notice, value]);
							borrarUsuario(id);
						}
					}
				]
			}
		});
	}

	function borrarUsuario(id){
		var resource = new Usuario({id: id});
		resource.$delete(function(usuario){
			if(usuario){
				notificationService.notifyWithDefaults({
					title: 'Empresa eliminada',
					text: 'El usuario fue eliminada correctamente',
					type: 'success'
				});

				$timeout(function(){
					$scope.tableParams.reload();
				}, 1000);
				
			}else{
				notificationService.notifyWithDefaults({
					title: 'Ha ocurrido un error',
					text: 'Intente eliminar el usuario nuevamente.',
					type: 'error'
				});
			}
		});
	}
});
