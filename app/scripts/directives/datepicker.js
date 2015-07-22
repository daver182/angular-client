'use strict';

/**
 * @ngdoc directive
 * @name seedApp.directive:bDatepicker
 * @description
 * # bDatepicker
 */
angular.module('seedApp').directive('bDatepicker', function () {
	return {
		require: '?ngModel',
		restrict: 'A',
		link: function($scope, element, attrs, controller) {
			var updateModel;
			var options = {
				language: 'es',
				format: 'dd/mm/yyyy'
			};
			updateModel = function(ev) {
				element.datepicker('hide');
				element.blur();
				return $scope.$apply(function() {
					return controller.$setViewValue(ev.date);
				});
			};
			if (controller != null) {
				controller.$render = function() {
					if(controller.$viewValue){
						element.datepicker(options).on('changeDate', updateModel);
						var date = controller.$viewValue.split('/');
						//element.datepicker(options).data().datepicker.date = controller.$viewValue;
						//element.datepicker(options).data().datepicker.date = new Date();
						//element.datepicker('setValue');
						element.datepicker('update', new Date(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0])));
						return controller.$viewValue;
					}
				};
			}

			return attrs.$observe('bDatepicker', function(value) {
				return element.datepicker(options).on('changeDate', updateModel);
			});
		}
	}; 
});