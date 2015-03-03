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
		'http://crosan-180346.sae1.nitrousbox.com/contratistas/public/trabajador/:id', 
		{id:'@id'},
		{
			query: {method: 'GET', isArray: false},
			update: { method: 'PUT', isArray: false }
		}
	);
});
