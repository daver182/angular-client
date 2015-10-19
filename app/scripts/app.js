'use strict';

//TODO: Definir esto en otro lugar
window.URL = 'http://preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com/public';

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
		'ngTable',
		'ngTableExport',
		'platanus.rut',
		'ui.mask',
		'jlareau.pnotify',
		'blockUI',
		'ngTagsInput',
		'angucomplete-alt',
		'ngFileUpload',
		'ui.select',
		'brantwills.paging',
		'angularMoment',
		'ui.bootstrap.tabs',
		'ui.bootstrap.collapse',
		'ui.bootstrap.dropdown',
		'ui.bootstrap.tpls',
		'listview'
	])
	.config(function ($stateProvider, $urlRouterProvider, $authProvider, notificationServiceProvider, blockUIConfig, uiSelectConfig) {
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
			})
			.state('home.perfil', {
				url: '/perfil',
				templateUrl: '/views/perfil.html',
				controller: 'PerfilCtrl'
			});

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: '/views/auth/login.html',
				controller: 'LoginCtrl'
			})
			.state('logout', {
				url: '/logout',
				template: null,
				controller: 'LogoutCtrl'
			})
			.state('forgot', {
				url: '/forgot',
				templateUrl: '/views/auth/forgot.html',
				controller: 'ForgotCtrl'
			});

		$stateProvider.state('home.forbidden', {
			url: '/forbidden',
			templateUrl: '/views/forbidden.html'
		})

		$stateProvider
			.state('home.trabajadores', {
				url: '/trabajadores',
				templateUrl: '/views/trabajador/lista.html',
				controller: 'TrabajadorCtrl'
			})
			.state('home.nuevoTrabajador', {
				url: '/trabajadores/nuevo',
				templateUrl: '/views/trabajador/detalle.html',
				controller: 'DetalletrabajadorCtrl',
				/*data: {
					denegados: [2]
				}*/
			})
			.state('home.detalleTrabajador', {
				url: '/trabajadores/detalle/:id',
				templateUrl: '/views/trabajador/detalle.html',
				controller: 'DetalletrabajadorCtrl',
				/*data: {
					denegados: [2]
				}*/
			});

		$stateProvider
			.state('home.empresas', {
				url: '/empresas',
				templateUrl: '/views/empresa/lista.html',
				controller: 'EmpresaCtrl',
				/*data: {
					denegados: [2]
				}*/
			})
			.state('home.nuevaEmpresa', {
				url: '/empresas/nueva',
				templateUrl: '/views/empresa/detalle.html',
				controller: 'DetalleempresaCtrl',
				/*data: {
					denegados: [2]
				}*/
			})
			.state('home.detalleEmpresa', {
				url: '/empresas/detalle/:id',
				templateUrl: '/views/empresa/detalle.html',
				controller: 'DetalleempresaCtrl',
				/*data: {
					denegados: [2]
				}*/
			});

		$stateProvider
			.state('home.usuarios', {
				url: '/usuarios',
				templateUrl: '/views/usuario/lista.html',
				controller: 'UsuarioCtrl'
			})
			.state('home.nuevoUsuario', {
				url: '/usuarios/nuevo',
				templateUrl: '/views/usuario/detalle.html',
				controller: 'DetalleusuarioCtrl'
			})
			.state('home.detalleUsuario', {
				url: '/usuarios/detalle/:id',
				templateUrl: '/views/usuario/detalle.html',
				controller: 'DetalleusuarioCtrl'
			});

		$stateProvider
			.state('home.contratos', {
				 url: '/contratos',
				 templateUrl: '/views/contrato/lista.html',
				 controller: 'ContratoCtrl'
			})
			.state('home.nuevoContrato', {
				url: '/contratos/nuevo',
				templateUrl: '/views/contrato/detalle.html',
				controller: 'DetallecontratoCtrl'
			})
			.state('home.detalleContrato', {
				url: '/contratos/detalle/:id',
				templateUrl: '/views/contrato/detalle.html',
				controller: 'DetallecontratoCtrl'
			})
			.state('home.contratistasContrato', {
				url: '/contratos/detalle/:id/contratistas',
				templateUrl: '/views/contrato/contratistas.html',
				controller: 'ContratistascontratoCtrl'
			});

		$stateProvider
			.state('home.evaluaciones', {
				 url: '/evaluaciones',
				 templateUrl: '/views/evaluacion/lista.html',
				 controller: 'EvaluacionCtrl'
			})
			.state('home.nuevaEvaluacion', {
				url: '/evaluaciones/nuevo',
				templateUrl: '/views/evaluacion/detalle.html',
				controller: 'DetalleevaluacionCtrl'
			})
			.state('home.detalleEvaluacion', {
				url: '/evaluaciones/detalle/:id',
				templateUrl: '/views/evaluacion/detalle.html',
				controller: 'DetalleevaluacionCtrl'
			})
			.state('home.requisitosEvaluacion', {
				url: '/evaluaciones/detalle/:id/requisitos',
				templateUrl: '/views/evaluacion/requisitos.html',
				controller: 'RequisitosevaluacionCtrl'
			})
			.state('home.habilitacionesEvaluacion', {
				url: '/evaluaciones/detalle/:id/habilitaciones',
				templateUrl: '/views/evaluacion/habilitaciones.html',
				controller: 'HabilitacionesevaluacionCtrl'
			});

		$stateProvider
			.state('home.licencias', {
				 url: '/licencias',
				 templateUrl: '/views/licencia/lista.html',
				 controller: 'LicenciaCtrl'
			});

		$stateProvider
			.state('home.resumen', {
				 url: '/resumen/:id',
				 templateUrl: '/views/resumen/vista1.html',
				 controller: 'ResumenCtrl'
			})
			.state('home.informeEvaluacion', {
				 url: '/informe/:id',
				 templateUrl: '/views/resumen/vista2.html',
				 controller: 'ResumenCtrl'
			});

		$stateProvider
			.state('home.nominas', {
				 url: '/nominas',
				 templateUrl: '/views/nominas/index.html',
				 controller: 'NominasCtrl'
			});

		$stateProvider
			.state('home.recursos', {
				url: '/recursos',
				templateUrl: '/views/recursos/lista.html',
				controller: 'RecursosCtrl'
			})


		$urlRouterProvider.otherwise('/');

		$authProvider.loginRedirect = '/';
		$authProvider.logoutRedirect = '/';
		$authProvider.signupRedirect = '/login';
		$authProvider.loginUrl = window.URL + '/auth/login';
		$authProvider.signupUrl = window.URL + '/auth/register';
		$authProvider.loginRoute = '/login';
		$authProvider.signupRoute = '/register';

		notificationServiceProvider.setDefaults({
			buttons: {
				closer: false,
            	sticker: false
			}
        });

		/*uiSelectConfig.theme = 'bootstrap';
		uiSelectConfig.resetSearchInput = true;
		uiSelectConfig.appendToBody = true;*/

        blockUIConfig.message = 'Cargando, por favor espere...';
        blockUIConfig.requestFilter = function(config) {

        	if(config.method === 'DELETE'){
				return false;
			}

			if(config.url.match(/http:\/\/preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com\/public\/empresa\/buscar/)){
				return false;
			}

			if(config.url.match(/http:\/\/preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com\/public\/trabajador\/buscar/)){
				return false;
			}

			if(config.url.match(/http:\/\/preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com\/public\/faena\/buscar/)){
				return false;
			}

			if(config.url.match(/http:\/\/preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com\/public\/licencia\/buscar/)){
				return false;
			}

			if(config.url.match(/http:\/\/preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com\/public\/contrato\/buscar/)){
				return false;
			}

			if(config.url.match(/http:\/\/preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com\/public\/faena_contratista\/buscar/)){
				return false;
			}

			if(config.url.match(/http:\/\/preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com\/public\/evaluacion\/[0-9]\/requisitos/)){
				return false;
			}

			if(config.url.match(/http:\/\/preview.snh7fujp32384cxrlmffilcvx3q2rzfrd95a1oi3qlgqr529.box.codeanywhere.com\/public\/habilidad\/buscar/)){
				return false;
			}
		};
	})
	.run(function($rootScope, $state, $auth, Role, amMoment) {
		$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
			if(toState.name === 'login') return;

			if (!$auth.isAuthenticated()) {
				if(toState.name !== 'forgot') {
					e.preventDefault();
					$state.go('login');
				}
			}else{
				if(toState.name === 'login') {
					e.preventDefault();
					$state.go('home.main');
				}else {
					var role = Role.get();
					if(toState.data && toState.data.denegados.indexOf(role) !== -1){
						e.preventDefault();
						$state.go('home.forbidden');
					}

					switch(role){
						case 4:
							if(toState.name !== 'home.resumen'){
								$state.go('home.resumen');
							}
							break;
					}
				}
			}
		});

		amMoment.changeLocale('es');
	});
