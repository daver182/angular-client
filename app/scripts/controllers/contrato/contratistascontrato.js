'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:ContratistascontratoCtrl
 * @description
 * # ContratistascontratoCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('ContratistascontratoCtrl', function ($scope, $stateParams, Contrato, $http, $state) {
	if($stateParams.id){
		$scope.contrato = Contrato.get({ id: $stateParams.id }, function(data){
			$scope.faenasAutorizadas = Contrato.verFaenasAutorizadas({ id: $scope.contrato.id }, function(){
				buscarContratistas($scope.faenasAutorizadas[0].id);
			});
		});
	}else{
		$state.go('home.contratos');
	}
	

	$scope.contratistasFaena = function(faena){
		buscarContratistas(faena);
	}

	$scope.addContratista = function(tag){
		Contrato.guardarContratista({ id: $scope.contrato.id, faena: $scope.faenaActual, tag: tag });
	}

	$scope.removeContratista = function(tag){
		Contrato.borrarContratista({ id: $scope.contrato.id, faena: $scope.faenaActual, empresa: tag.id });
	}

	$scope.buscarEmpresas = function(query){
		return $http.get(window.URL + '/empresa/buscar?type=tag&texto=' + query);
	}

	function buscarContratistas(faena){
		$scope.faenaActual = faena;
		$scope.contratistasAutorizados = Contrato.verContratistas({id: $scope.contrato.id, faena: faena});
	}
});