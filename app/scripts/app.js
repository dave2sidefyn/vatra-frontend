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
  .config(function ($routeProvider) {
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
  });
