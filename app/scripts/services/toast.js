'use strict';

/**
 * @ngdoc service
 * @name seedApp.Toast
 * @description
 * # Toast
 * Service in the seedApp.
 */
angular.module('seedApp').service('Toast', function (notificationService) {
    return {
    	success: function(title, description){
    		notificationService.notifyWithDefaults({
				title: title,
				text: description,
				type: 'success'
			});
    	},
    	error: function(description, title){
    		title = 'Ocurrió un error';
    		notificationService.notifyWithDefaults({
				title: title,
				text: description,
				type: 'error'
			});
    	}
    }
});
