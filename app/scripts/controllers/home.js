'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('HomeCtrl', function ($scope, $http, $state, Role, Auth, $timeout) {
	$scope.$state = $state;
	$scope.smallMenu = false;
	$scope.isCollapsed = true;
	$scope.role = Role.get();
	$scope.user = Auth.getUser($scope);
	$scope.rutaBase = window.URL + '/';

	$scope.menuOpen = {
		empresas: false
	};

	//if($state.is('home.empresas') || $state.is('home.nuevaEmpresa') || $state.is('home.detalleEmpresa')) $scope.menuOpen['empresas'] = true;

	$scope.verSubmenu = function(submenu){
		$scope.menuOpen = {};
		$scope.menuOpen[submenu] = !$scope.menuOpen[submenu];
	}

	$scope.submenu = false;

	$timeout(function(){
		if($state.is('home.usuarios') || $state.is('home.nuevoUsuario') || $state.is('home.detalleUsuario')){
			$scope.submenu = 'usuarios';
		}
	}, 10);




});
