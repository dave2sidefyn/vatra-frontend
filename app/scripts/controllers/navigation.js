'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the vaTraApp
 */
angular.module('vaTraApp')
  .controller('NavigationCtrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.items = [
      {
        name: 'Schema',
        link: 'schema'
      },
      {
        name: 'Sicherheit',
        link: 'security'
      },
      {
        name: 'Algorithmen',
        link: 'algos'
      },
      {
        name: 'Statistiken',
        link: 'stats'
      },
      {
        name: 'API',
        link: 'api'
      }
    ];

    $scope.isActive = function (link) {
      return '/' + link === $location.path();
    };
  });
