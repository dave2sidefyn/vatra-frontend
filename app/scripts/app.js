'use strict';

/**
 * @ngdoc overview
 * @name vaTraApp
 * @description
 * # vaTraApp
 *
 * Main module of the application.
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
      .when('/schema', {
        templateUrl: 'views/schema.html',
        controller: 'SchemaCtrl',
        controllerAs: 'schema'
      })
      .when('/security', {
        templateUrl: 'views/security.html',
        controller: 'SecurityCtrl',
        controllerAs: 'security'
      })
      .when('/algos', {
        templateUrl: 'views/algos.html',
        controller: 'AlgosCtrl',
        controllerAs: 'algos'
      })
      .when('/stats', {
        templateUrl: 'views/stats.html',
        controller: 'StatsCtrl',
        controllerAs: 'stats'
      })
      .when('/api', {
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
  })
  .run(function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function () {
      // redirect to login page if not logged in
      if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
        $location.path('/login');
      }
    });
  });
