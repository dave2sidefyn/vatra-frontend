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
        },
        secure: {
          getResult: '',
          postValue: 'some secure value'
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

        }, function (data, status, headers, config) {
          // Failure handler
          console.error('Something went wrong while trying to login... ', data, status, headers, config);
        });
      };

      $scope.userlogout = function () {
        LoginService.logout(function (data, status, headers, config) {
          // Success handler
          $scope.credentials = {email: '', password: ''};
          delete $cookies['JSESSIONID'];
          console.info('The user has been logged out!');

          $location.url('/');

        }, function (data, status, headers, config) {
          // Failure handler
          console.error('Something went wrong while trying to logout... ', data, status, headers, config);
        });
      };

      var secureResources = function (headers) {
        if (headers !== undefined) {
          return $resource('http://localhost:8080/rest/secure', {}, {
            post: {method: 'POST', headers: headers, isArray: false}
          });
        } else {
          return $resource('http://localhost:8080/rest/secure', {}, {
            get: {method: 'GET', cache: false, isArray: false},
            options: {method: 'OPTIONS', cache: false}
          });
        }
      };

      $scope.getSecureGreetings = function () {
        $scope.greetings.secure.getResult = '';

        secureResources().get().$promise.then(function (response) {
          console.log('GET /rest/secure returned: ', response);
          $scope.greetings.secure.getResult = response.greetings;

        }).catch(function (response) {
          handleError(response);
        });
      };

      $scope.postSecureGreetings = function () {
        CsrfService.addResourcesCsrfToHeaders(secureResources().options, $http.defaults.headers.post).then(function (headers) {
          secureResources(headers).post({greetings: $scope.greetings.secure.postValue}).$promise.then(function (response) {
            console.log('POST /rest/secure returned: ', response);
            console.info('You might want to check the server logs to see that the POST has been handled!');

          }).catch(function (response) {
            handleError(response);
          });
        });
      };

      var handleError = function (response) {

        if (response.status === 401) {
          console.error('You need to login first!');

        } else {
          console.error('Something went wrong...', response);
        }
      };
    });
