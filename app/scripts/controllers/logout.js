'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the seedApp
 */
angular.module('seedApp')
  .controller('LogoutCtrl', function ($scope, $auth, $state) {
    $auth.logout().then(function() {
        console.log('logout');
    });
  });
