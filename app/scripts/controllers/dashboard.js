'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the vaTraApp
 */
angular.module('vaTraApp')
  .controller('DashboardCtrl', function ($resource, $scope, CsrfService, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var appResources = function (headers) {
      if (headers !== undefined) {
        return $resource('http://localhost:8080/rest/secure/app', {}, {
          post: {method: 'POST', headers: headers, isArray: false}
        });
      } else {
        return $resource('http://localhost:8080/rest/secure/app', {}, {
          get: {method: 'GET', cache: false, isArray: true},
          options: {method: 'OPTIONS', cache: false}
        });
      }
    };


    var getApps = function () {
      appResources().get().$promise.then(function (data) {
        console.log('GET /rest/secure/app returned: ', data);
        var apps = [];
        data.forEach(function (record) {
          apps.push({
            name: record.name
          });
        });

        $scope.apps = apps;

      }).catch(function (response) {
        handleError(response);
      });
    };

    $scope.saveApp = function () {
      CsrfService.addResourcesCsrfToHeaders(appResources().options, $http.defaults.headers.post).then(function (headers) {
        appResources(headers).post({name: 'test'}).$promise.then(function (response) {
          console.log('POST /rest/secure/app returned: ', response);
          console.info('You might want to check the server logs to see that the POST has been handled!');
        }).catch(function (response) {
          handleError(response);
        });
      });
    };

    getApps();

    var handleError = function (response) {
      console.error('Something went wrong...', response);
    };
  });
