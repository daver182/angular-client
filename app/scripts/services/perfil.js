'use strict';

/**
 * @ngdoc service
 * @name seedApp.perfil
 * @description
 * # perfil
 * Service in the seedApp.
 */
angular.module('seedApp').service('Perfil', function ($resource) {
	return $resource(
		window.URL + '/perfil/:id', 
		{ id:'@id' },
		{
			query: { method: 'GET', isArray: false },
			update: { method: 'PUT', isArray: false }
		}
	);
});