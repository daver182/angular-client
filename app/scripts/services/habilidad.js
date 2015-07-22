'use strict';

/**
 * @ngdoc service
 * @name seedApp.Habilidad
 * @description
 * # Habilidad
 * Service in the seedApp.
 */
angular.module('seedApp').service('Habilidad', function ($resource) {
	return $resource(
		window.URL + '/habilidad/:id',
		{ id:'@id' },
		{ 
			query: { method: 'GET', isArray: true },
			
		}
	);
});
