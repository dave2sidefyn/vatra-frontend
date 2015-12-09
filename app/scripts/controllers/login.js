'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the vaTraApp
 */
angular.module('vaTraApp')
    .controller('LoginCtrl',
    function ($cookies, $location, $q, $resource, $scope, CsrfService, LoginService) {

        $scope.credentials = {
            email: '',
            password: ''
        };

        $scope.userlogin = function () {
            LoginService.login($scope.credentials.email, $scope.credentials.password, function (data, status, headers, config) {
                // Success handler
                console.info('The user has been successfully logged in! ', data, status, headers, config);
                $location.url('/dashboard');

            }, function (data, status, headers, config) {
                // Failure handler
                console.error('Something went wrong while trying to login... ', data, status, headers, config);
            });
        };

        $scope.userlogout = function () {
            LoginService.logout(function () {
                // Success handler
                $scope.credentials = {email: '', password: ''};
                delete $cookies.JSESSIONID;
                console.info('The user has been logged out!');

            }, function (data, status, headers, config) {
                // Failure handler
                console.error('Something went wrong while trying to logout... ', data, status, headers, config);
            });
        };

        $scope.userlogout();

    });
