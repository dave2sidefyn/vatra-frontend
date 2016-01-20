'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 *
 * Shows the statistics of all the transactions.
 */
angular.module('vaTraApp')
    .controller('StatsCtrl', function ($scope, $resource, $routeParams) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var requestResources = function () {
            return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/request', {}, {
                get: {method: 'GET', cache: false, isArray: true},
                options: {method: 'OPTIONS', cache: false}
            });
        };

        requestResources().get().$promise.then(function (data) {
            var valid = 0;
            var invalid = 0;

            for (var i = 0; i < data.length; i++) {
                if (data[i].valid) {
                    valid++;
                } else {
                    invalid++;
                }
            }

            $scope.statistics = [
                {'name': 'Requests', 'value': valid + invalid},
                {'name': 'Gültige Requests', 'value': valid},
                {'name': 'Ungültige Requests', 'value': invalid},
            ];
        }).catch(function (response) {
            console.error('Something went wrong...', response);
        });
    });
