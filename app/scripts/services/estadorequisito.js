'use strict';

/**
 * @ngdoc service
 * @name seedApp.Estadorequisito
 * @description
 * # Estadorequisito
 * Service in the seedApp.
 */
angular.module('seedApp').service('Estadorequisito', function ($resource) {
	return $resource(
		window.URL + '/estado_requisito/:id', 
		{ id:'@id' },
		{ 
			query: { method: 'GET', isArray: true },
		}
	);
});