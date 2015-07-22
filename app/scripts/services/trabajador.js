'use strict';

/**
 * @ngdoc service
 * @name seedApp.Trabajador
 * @description
 * # Trabajador
 * Service in the seedApp.
 */
angular.module('seedApp').service('Trabajador', function ($resource) {
	return $resource(
		window.URL + '/trabajador/:id', 
		{ id:'@id' },
		{
			query: { method: 'GET', isArray: false },
			update: { method: 'PUT', isArray: false },
			buscar: { method:'GET', isArray: false, url: window.URL + '/trabajador/buscar?rut=:rut' },
		}
	);
});
