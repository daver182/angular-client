'use strict';

/**
 * @ngdoc service
 * @name seedApp.Requisito
 * @description
 * # Requisito
 * Service in the seedApp.
 */
angular.module('seedApp').service('Requisito', function ($resource) {
	return $resource(
		window.URL + '/requisito/:id',
		{ id:'@id' },
		{ 
			query: { method: 'GET', isArray: true },
		}
	);
});