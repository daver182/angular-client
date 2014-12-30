'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the seedApp
 */
angular.module('seedApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
