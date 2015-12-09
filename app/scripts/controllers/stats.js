'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the vaTraApp
 */
angular.module('vaTraApp')
    .controller('StatsCtrl', function ($scope) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // temp stats datas:
        $scope.statistics = [
            {'name': 'Requests', 'value': 2001},
            {'name': 'Gültige Requests', 'value': 201},
            {'name': 'Ungültige Requests', 'value': 100},
        ];

    });
