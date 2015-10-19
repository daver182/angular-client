'use strict';

/**
 * @ngdoc factory
 * @name seedApp.Resource
 * @description
 * # Resource
 * Factory in the seedApp.
 */

angular.module('seedApp').factory( 'Resource', function($resource) {
	return function( url, params, methods ) {
		var defaults = {
			update: { method: 'PUT', isArray: false },
			create: { method: 'POST' }
		};

		methods = angular.extend( defaults, methods );

		var resource = $resource( url, params, methods );

		resource.prototype.$save = function() {
			if ( !this.id ) {
				return this.$create();
			}
			else {
				return this.$update();
			}
		};

		return resource;
	};
});