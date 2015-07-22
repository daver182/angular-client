'use strict';

/**
 * @ngdoc service
 * @name seedApp.Empresa
 * @description
 * # Empresa
 * Service in the seedApp.
 */
angular.module('seedApp').service('Empresa', function ($resource) {
	return $resource(
		window.URL + '/empresa/:id',
		{id:'@id'},
		{
			query: { method: 'GET', isArray: false },
			update: { method: 'PUT', isArray: false }
		}
	);
});
