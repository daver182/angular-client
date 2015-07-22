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
        buscarEmpresa: function(scope, nombre){
            return $http.get('http://preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com/public/empresa/buscar?texto=' + nombre).then(function(response) {
                scope.empresas = response.data;
            });
        }
    }
});
