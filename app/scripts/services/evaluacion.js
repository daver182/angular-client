'use strict';

/**
 * @ngdoc service
 * @name seedApp.Evaluacion
 * @description
 * # Evaluacion
 * Service in the seedApp.
 */
angular.module('seedApp').service('Evaluacion', function (Resource) {
	return Resource(
		window.URL + '/evaluacion/:id', 
		{id:'@id'},
		{
			query: { method: 'GET', isArray: false },
			resumen: { method:'GET', isArray: false, url: window.URL + '/evaluacion/resumen' },
			verRequisitos: { method:'GET', params: { id: '@id' }, isArray: true, url: window.URL + '/evaluacion/:id/requisitos' },
			guardarRequisito: { method:'POST', params: { id: '@id' }, isArray: true, url: window.URL + '/evaluacion/:id/requisitos' },
			borrarRequisito: { method:'DELETE', params: { id: '@id' }, isArray: true, url: window.URL + '/evaluacion/:id/requisitos/:idRequisitoEvaluacion' },

			verHabilitaciones: { method:'GET', params: { id: '@id', habilitado: true }, isArray: true, url: window.URL + '/evaluacion/:id/habilitaciones' },
			verRestricciones: { method:'GET', params: { id: '@id', habilitado: false }, isArray: true, url: window.URL + '/evaluacion/:id/habilitaciones' },
			verTodasHabilitaciones:  { method:'GET', params: { id: '@id' }, isArray: true, url: window.URL + '/evaluacion/:id/habilitaciones' },
			guardarHabilitacion: { method:'POST', params: { id: '@id' }, isArray: false, url: window.URL + '/evaluacion/:id/habilitaciones' },
			borrarHabilitacion: { method:'DELETE', params: { id: '@id' }, isArray: true, url: window.URL + '/evaluacion/:id/habilitaciones/:idHabilitacion' },
		}
	);
});
