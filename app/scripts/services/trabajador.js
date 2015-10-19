'use strict';

/**
 * @ngdoc service
 * @name seedApp.Trabajador
 * @description
 * # Trabajador
 * Service in the seedApp.
 */
angular.module('seedApp').service('Trabajador', function (Resource) {
	return Resource(
		window.URL + '/trabajador/:id', 
		{ id:'@id' },
		{
			query: { method: 'GET', isArray: false },
			buscar: { method:'GET', isArray: false, url: window.URL + '/trabajador/buscar?rut=:rut' },
		}
	);
});
