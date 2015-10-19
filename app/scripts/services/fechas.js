'use strict';

/**
 * @ngdoc service
 * @name seedApp.fechas
 * @description
 * # fechas
 * Service in the seedApp.
 */
angular.module('seedApp').service('Fechas', function () {
	return {
		transformar: function(fecha) {
			return fecha.split('/')[2] + '-' + (fecha.split('/')[1]) + '-' + fecha.split('/')[0];
		}
	}
});
