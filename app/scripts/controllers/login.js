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
    function ($cookies, $http, $location, $q, $resource, $scope, CsrfService, LoginService) {

      $scope.greetings = {
        open: {
          getResult: '',
          postValue: 'some value'
        }
      };

      $scope.credentials = {
        email: '',
        password: ''
      };

      var openResources = $resource('http://localhost:8080/rest/open', {}, {
        get: {method: 'GET', cache: false, isArray: false},
        post: {method: 'POST', isArray: false}
      });

      $scope.getOpenGreetings = function () {
        $scope.greetings.open.getResult = '';

        openResources.get().$promise.then(function (response) {
          console.log('GET /rest/open returned: ', response);
          $scope.greetings.open.getResult = response.greetings;
        });
      };

      $scope.postOpenGreetings = function () {
        openResources.post({greetings: $scope.greetings.open.postValue}).$promise.then(function (response) {
          console.log('POST /rest/open returned: ', response);
          console.info('You might want to check the server logs to see that the POST has been handled!');
        });
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

          $location.url('/');

        }, function (data, status, headers, config) {
          // Failure handler
          console.error('Something went wrong while trying to logout... ', data, status, headers, config);
        });
      };


      LoginService.logout(function () {
        // Success handler
        $scope.credentials = {email: '', password: ''};
        delete $cookies.JSESSIONID;
        console.info('The user has been logged out!');

      }, function (data, status, headers, config) {
        // Failure handler
        console.error('Something went wrong while trying to logout... ', data, status, headers, config);
      });

    });
