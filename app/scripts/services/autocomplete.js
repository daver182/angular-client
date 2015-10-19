'use strict';

/**
 * @ngdoc service
 * @name seedApp.Autocomplete
 * @description
 * # Autocomplete
 * Service in the seedApp.
 */
angular.module('seedApp').service('Autocomplete', function ($http) {
	return {
		buscarEmpresa: function(scope, variable, texto){
			return $http.get('http://preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com/public/empresa/buscar?texto=' + texto).then(function(response) {
				scope[variable] = response.data;
			});
		},
		buscarContratos: function(scope, variable, empresa, texto){
			//http://preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com/public/contrato/buscar?type=evaluacion&empresa=' + id + '&texto=
			return $http.get('http://preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com/public/contrato/buscar?type=evaluacion&empresa=' + empresa + '&texto=' + texto).then(function(response) {
				scope[variable] = response.data;
			});
		},
		buscarTrabajador: function(scope, variable, texto){
			return $http.get('http://preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com/public/trabajador/buscar?type=nombre&texto=' + texto).then(function(response) {
				scope[variable] = response.data;
			});
		}
	}
});
