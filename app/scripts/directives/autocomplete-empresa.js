'use strict';

/**
 * @ngdoc directive
 * @name seedApp.directive:autocompleteEmpresa
 * @description
 * # autocompleteEmpresa
 */
angular.module('seedApp').directive('autocompleteEmpresa', function ($http) {
    return {
        restrict: 'A',
        require: ["uiSelect", "ngModel"],

        compile: function compile(tElement, tAttrs, transclude) {
            tElement.append('<ui-select-match placeholder="Buscar una empresa...">{{$select.selected.razon_social}}</ui-select-match> <ui-select-choices repeat="empresa in empresas track by $index" refresh="cargarEmpresas($select.search)" refresh-delay="0"> <div ng-bind-html="empresa.razon_social | highlight: $select.search"></div> </ui-select-choices>');

            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {},
                post: function postLink(scope, iElement, iAttrs, controller) {
                    scope.empresa = {};
                    scope.cargarEmpresas = function(nombre) {
                        $http.get('http://preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com/public/empresa/buscar?texto=' + nombre).then(function(response) {
                            scope.empresas = response.data;
                        });
                	}
                }
            }
        }
    };
  });
