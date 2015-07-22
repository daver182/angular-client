'use strict';

/**
 * @ngdoc service
 * @name seedApp.Tipousuario
 * @description
 * # Tipousuario
 * Service in the seedApp.
 */
angular.module('seedApp').service('TipoUsuario', function ($resource) {
	return $resource(
		window.URL + '/tipo_usuario/:id', 
		{id:'@id'},
		{
			query: {method: 'GET', isArray: true},
			update: { method: 'PUT', isArray: false }
		}
	);
});
