'use strict';

/**
 * @ngdoc service
 * @name seedApp.Usuario
 * @description
 * # Usuario
 * Service in the seedApp.
 */
angular.module('seedApp').service('Usuario', function ($resource) {
	return $resource(
		window.URL + '/usuario/:id', 
		{id:'@id'},
		{
			query: {method: 'GET', isArray: false},
			update: { method: 'PUT', isArray: false }
		}
	);
});
