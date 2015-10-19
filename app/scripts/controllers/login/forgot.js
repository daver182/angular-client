'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the seedApp
 */
angular.module('seedApp').controller('ForgotCtrl', function ($scope, $auth, $state, $http, Toast) {
    $scope.recover = function(valid){
        if(valid){
            $http.post(window.URL + '/auth/recover', { email: $scope.recover.email }).then(function(response){
                Toast.success(response.data.message);
            }, function(error){
                Toast.error(error.data.message, 'Ocurrió un error');
            });
        }
    }
});
