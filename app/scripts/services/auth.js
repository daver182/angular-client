'use strict';

/**
 * @ngdoc service
 * @name seedApp.Auth
 * @description
 * # Auth
 * Service in the seedApp.
 */
angular.module('seedApp').service('Auth', function ($http) {
	return {
		getUser: function(scope){
			$http.get(window.URL + '/auth/user').success(function(data){
				return scope.user = data;
			});
		}
	}
});