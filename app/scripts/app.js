'use strict';

/**
 * @ngdoc overview
 * @name seedApp
 * @description
 * # seedApp
 *
 * Main module of the application.
 */
angular
	.module('seedApp', [
		'ngAnimate',
		'ngMessages',
		'ngResource',
		'ngSanitize',
		'ngTouch',
		'ui.router',
		'satellizer'
	])
	.config(function ($stateProvider, $urlRouterProvider, $authProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/views/home.html',
				controller: 'HomeCtrl'
			});

		$urlRouterProvider.otherwise('/');
	});
