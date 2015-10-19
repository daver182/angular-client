'use strict';

/**
 * @ngdoc service
 * @name seedApp.Contrato
 * @description
 * # Contrato
 * Service in the seedApp.
 */
angular.module('seedApp').service('Contrato', function (Resource) {
	return Resource(
		window.URL + '/contrato/:id', 
		{ id: '@id' },
		{
			query: { method: 'GET', isArray: false },
			verFaenasAutorizadas: { method:'GET', params: { id: '@id' }, isArray: true, url: window.URL + '/contrato/:id/faenas_autorizadas' },
			verContratistas: { method:'GET', params: { id: '@id' }, isArray: true, url: window.URL + '/contrato/:id/contratistas' },
			guardarContratista: { method:'POST', params: { id: '@id' }, isArray: true, url: window.URL + '/contrato/:id/contratistas' },
			borrarContratista: { method:'DELETE', params: { id: '@id' }, isArray: true, url: window.URL + '/contrato/:id/contratistas' },
		}
	);
});
