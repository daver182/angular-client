'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:RecursosCtrl
 * @description
 * # RecursosCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('RecursosCtrl', function ($scope, Recursos, EstadoEvaluacion) {
    /*$scope.items = [
        { id: 1, valor: "valor 1" },
        { id: 2, valor: "valor 2" },
        { id: 4, valor: "valor 3" }
    ]*/
    $scope.editMode = [];
    $scope.recursoActual = '1';

    $scope.cargar = function(){
        $scope.editMode = [];
        switch ($scope.recursoActual) {
            case '1':
                $scope.items = EstadoEvaluacion.query();
                break;


            default:

        }
    }

    $scope.agregar = function(){
        var nuevoItem = new EstadoEvaluacion();
        nuevoItem.nombre = '[Ingresar texto]';
        $scope.items.push(nuevoItem);
    }

    $scope.borrar = function(index){

    }

    $scope.editar = function(index){
        $scope.editMode[index] = true;
    }

    $scope.guardar = function(index){
        $scope.editMode[index] = false;
        console.log($scope.items[index])
    }
});
