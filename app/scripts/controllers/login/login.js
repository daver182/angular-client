'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('LoginCtrl', function ($scope, $auth, $state, Toast) {
	$scope.login = function() {
		$auth.login({ email: $scope.user.email, password: $scope.user.password }).then(function() {
			//$state.go('home');
		}, function(err){
			Toast.error('Error al iniciar sesión', err.data.message);
		});
	}
});