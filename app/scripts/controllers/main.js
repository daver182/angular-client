'use strict';

/**
 * @ngdoc function
 * @name seedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the seedApp
 */
angular.module('seedApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
