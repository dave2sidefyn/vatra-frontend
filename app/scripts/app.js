'use strict';

/**
 * @ngdoc overview
 * @name vaTraApp
 * @description
 * # vaTraApp
 *
 * Main module of the application.
 * Loads all necessary modules and the authentication factory.
 * Makes the routing for the VaTra application.
 */
angular
    .module('vaTraApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/form.html',
                controller: 'FormCtrl',
                controllerAs: 'form'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/form', {
                templateUrl: 'views/form.html',
                controller: 'FormCtrl',
                controllerAs: 'form'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboard'
            })
            .when('/app/:appId', {
                redirectTo: '/app/:appId/schema'
            })
            .when('/app/:appId/schema', {
                templateUrl: 'views/schema.html',
                controller: 'SchemaCtrl',
                controllerAs: 'schema'
            })
            .when('/app/:appId/security', {
                templateUrl: 'views/security.html',
                controller: 'SecurityCtrl',
                controllerAs: 'security'
            })
            .when('/app/:appId/algos', {
                templateUrl: 'views/algos.html',
                controller: 'AlgosCtrl',
                controllerAs: 'algos'
            })
            .when('/app/:appId/stats', {
                templateUrl: 'views/stats.html',
                controller: 'StatsCtrl',
                controllerAs: 'stats'
            })
            .when('/app/:appId/api', {
                templateUrl: 'views/api.html',
                controller: 'ApiCtrl',
                controllerAs: 'api'
            })
            .otherwise({
                redirectTo: '/'
            });

        $httpProvider.defaults.withCredentials = true;
        // Tough luck: the default cookie-to-header mechanism is not working for cross-origin requests!
        $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN'; // The name of the cookie sent by the server
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'; // The default header name picked up by Spring Security
        // HTTP interceptors to check auth failures for xhr requests
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
    }).factory('authHttpResponseInterceptor', function ($q, $location) {
        return {
            response: function (response) {
                if (response.status === 401) {
                    console.log("Response 401");
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    console.log("Response Error 401", rejection);
                    $location.url('/login');
                }
                return $q.reject(rejection);
            }
        };
    });
