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
			// .state('home', {
			// 	url: '/',
			// 	templateUrl: '/views/home.html',
			// 	controller: 'HomeCtrl'
			// })
			.state('login', {
				url: '/login',
				templateUrl: '/views/auth/login.html',
				controller: 'LoginCtrl'
			})
			.state('register', {
				url: '/register',
				templateUrl: '/views/auth/register.html',
				controller: 'RegisterCtrl'
			})
			.state('logout', {
				url: '/logout',
				template: null,
				controller: 'LogoutCtrl'
			});

		$stateProvider
			.state('home', {
				abstract: true,
				templateURL: 'home.html'
			})
			.state('home.main', {
				url: '/',
				templateUrl: '/views/main.html',
				controller: 'MainCtrl'
			});
		
		/*$stateProvider
			.state('trabajadores', {
				 url: '/trabajadores',
				 templateUrl: '/views/trabajador/lista.html',
				 controller: 'TrabajadoresCtrl'
			})
			.state('detalleTrabajador', {
				url: '/trabajador/detalle/:id',
				templateUrl: '/views/trabajador/detalle.html',
				controller: 'DetalletrabajadorCtrl'
			})
			.state('editarTrabajador', {
				url: '/trabajador/editar/:id',
				templateUrl: '/views/trabajador/editar.html',
				controller: 'EditartrabajadorCtrl'
			});*/

		$urlRouterProvider.otherwise('/');

		$authProvider.loginRedirect = '/';
		$authProvider.logoutRedirect = '/';
		$authProvider.signupRedirect = '/login';
		$authProvider.loginUrl = 'http://crosan-180346.sae1.nitrousbox.com/contratistas/public/auth/login';
		$authProvider.signupUrl = 'http://crosan-180346.sae1.nitrousbox.com/contratistas/public/auth/register';
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