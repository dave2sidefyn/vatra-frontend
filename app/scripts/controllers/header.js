'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 *
 * Loads the current logged in user information and all the application names of this user.
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
                    return e.id === $routeParams.appId;
                });
                $scope.appName = app[0].name;
            } else {
                $scope.appName = 'Dashboard';
            }
        });

    });
