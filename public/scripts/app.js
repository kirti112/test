'use strict';




var lls_app=angular
    .module('vtest',[
		'ngCookies',
        'ngResource',
		'ui.bootstrap',
        'ngSanitize',
		'textAngular',
		'ngRoute',
	
		
	])
    .config(function ($routeProvider, config ) {
             $routeProvider
                
                .when('/', {
                             templateUrl: '/views/index.html',
                             controller: 'mainController',
                               className: 'lls_main_page'
                         })

               
    });


