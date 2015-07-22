'use strict';

/**
 * @ngdoc service
 * @name seedApp.Recursos
 * @description
 * # Recursos
 * Service in the seedApp.
 */
angular.module('seedApp').service('Recursos', function ($resource, $http) {
    return {
        estadoEvaluacion: function(){
            return $http.get(window.URL + '/estado_evaluacion');
        }
    }
});

angular.module('seedApp').service('EstadoEvaluacion', function ($resource) {
    return $resource(
		window.URL + '/estado_evaluacion/:id',
		{ id:'@id' },
		{
			query: { method: 'GET', isArray: true },
            'save': { method:'POST', params: { id: '@id' }, isArray: true },
			delete: { method:'DELETE', params: { id: '@id' }, isArray: true },
		}
	);
});
