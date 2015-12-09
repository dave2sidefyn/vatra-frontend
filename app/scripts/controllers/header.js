'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the vaTraApp
 */
angular.module('vaTraApp')
    .controller('HeaderCtrl', function (UserService, $scope, $routeParams) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        UserService.query().$promise.then(function (data) {
            $scope.email = data[0].email;
            $scope.apps = data[0].apps;

            if ($routeParams.appId) {
                var app = $.grep(data[0].apps, function (e) {
                    return e.id == $routeParams.appId;
                })
                $scope.appName = app[0].name;
            } else {
                $scope.appName = 'Dashboard';
            }
        });

    });
