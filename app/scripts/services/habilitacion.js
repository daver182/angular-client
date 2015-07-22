'use strict';

/**
 * @ngdoc service
 * @name seedApp.Habilidadevaluacion
 * @description
 * # Habilidadevaluacion
 * Service in the seedApp.
 */
angular.module('seedApp').service('Habilitacion', function ($resource) {
	return $resource(
		window.URL + '/habilitacion/:id',
		{ id:'@id' },
		{ 
			query: { method: 'GET', isArray: true },
			'save': { method:'POST', isArray: false },
			remove: { method: 'DELETE', url: window.URL + '/habilitacion/habilidad_evaluacion' }
		}
	);
	
});