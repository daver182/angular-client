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
            var data = {
                type: 'success'
            };
            if(title) data.title = title;
            if(description) data.text = description;

            notificationService.notifyWithDefaults(data);
    	},
    	error: function(title, description){
            var data = {
                title: 'Ocurrió un error',
                type: 'error'
            };
            if(description) data.text = description;

            notificationService.notifyWithDefaults(data);
    	}
    }
});
