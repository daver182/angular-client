'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the seedApp
 */
angular.module('seedApp')
  .controller('RegisterCtrl', function ($scope, $auth, $state) {
    $scope.register = function() {
      $auth.signup({
        email: $scope.user.email,
        password: $scope.user.password,
        confirmPassword: $scope.user.confirmPassword 
      }).then(function() {
          //$state.go('home');
      });
    };
  });
