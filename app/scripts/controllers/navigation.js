'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 *
 * Loads the backend navigation.
 * Offers function to check whether the navigation point is active or inactive.
 */
angular.module('vaTraApp')
    .controller('NavigationCtrl', function ($scope, $location) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.path = $location.path().split('/').splice(1, 2).join('/');
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
            return link === $location.path().split('/')[3];
        };
    });
