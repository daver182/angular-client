'use strict';

/**
 * @ngdoc service
 * @name seedApp.Role
 * @description
 * # Role
 * Service in the seedApp.
 */
angular.module('seedApp').service('Role', function ($auth) {
    return {
    	get: function(){
    		var payload = $auth.getPayload();
    		return parseInt(payload.type);
    	}
    }
});
