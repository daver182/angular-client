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
			})
			.state('login', {
				url: '/login',
				templateUrl: '/views/login.html',
				controller: 'LoginCtrl'
			})
			.state('register', {
				url: '/register',
				templateUrl: '/views/register.html',
				controller: 'RegisterCtrl'
			})
	        .state('logout', {
	            url: '/logout',
	            template: null,
	            controller: 'LogoutCtrl'
	        });

		$urlRouterProvider.otherwise('/');

		$authProvider.loginRedirect = '/';
	    $authProvider.logoutRedirect = '/';
	    $authProvider.signupRedirect = '/login';
	    $authProvider.loginUrl = 'http://rockola-178928.sae1.nitrousbox.com/auth/login';
	    $authProvider.signupUrl = 'http://rockola-178928.sae1.nitrousbox.com/auth/register';
	    $authProvider.loginRoute = '/login';
	    $authProvider.signupRoute = '/register';
	})
	.run(function($rootScope, $state, $auth) {
	    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
	        if(toState.name === 'login' || toState.name === 'register') return;
	        
	        if (!$auth.isAuthenticated()) {
	            e.preventDefault();
	            $state.go('login');
	        }
	    });
	});
