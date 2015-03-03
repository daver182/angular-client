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
		'satellizer',
		'ngTable'
	])
	.config(function ($stateProvider, $urlRouterProvider, $authProvider) {
		$stateProvider
			.state('home', {
				abstract: true,
				templateUrl: '/views/home.html',
				controller: 'HomeCtrl'
			})
			.state('home.main', {
				url: '/',
				templateUrl: '/views/main.html',
				controller: 'MainCtrl'
			});

		$stateProvider
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
			.state('home.trabajadores', {
				 url: '/trabajadores',
				 templateUrl: '/views/trabajador/lista.html',
				 controller: 'TrabajadoresCtrl'
			})
			.state('home.detalleTrabajador', {
				url: '/trabajadores/detalle/:id',
				templateUrl: '/views/trabajador/detalle.html',
				controller: 'DetalletrabajadorCtrl'
			})
			.state('home.empresas', {
				 url: '/empresas',
				 templateUrl: '/views/empresa/lista.html',
				 controller: 'EmpresaCtrl'
			})
			.state('home.detalleEmpresa', {
				url: '/empresas/detalle/:id',
				templateUrl: '/views/empresa/detalle.html',
				controller: 'DetalleempresaCtrl'
			})

		$authProvider.loginRedirect = '/';
		$authProvider.logoutRedirect = '/';
		$authProvider.signupRedirect = '/login';
		$authProvider.loginUrl = 'http://crosan-180346.sae1.nitrousbox.com/contratistas/public/auth/login';
		$authProvider.signupUrl = 'http://crosan-180346.sae1.nitrousbox.com/contratistas/public/auth/register';
		$authProvider.loginRoute = '/login';
		$authProvider.signupRoute = '/register';
	})
	/*.run(function($rootScope, $state, $auth) {
		$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
			if(toState.name === 'login' || toState.name === 'register') return;
			
			if (!$auth.isAuthenticated()) {
				e.preventDefault();
				$state.go('login');
			}
		});
	});*/