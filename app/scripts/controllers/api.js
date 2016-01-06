'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:ApiCtrl
 * @description
 * # ApiCtrl
 * Controller of the vaTraApp
 */
angular.module('vaTraApp')
  .controller('ApiCtrl', function ($scope, $resource, $routeParams, CsrfService, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var whitelabelResources = function (headers) {
      if (headers !== undefined) {
        return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/whitelabel', {}, {
          post: {method: 'POST', headers: headers, isArray: false}
        });
      } else {
        return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/whitelabel', {}, {
          get: {method: 'GET', cache: false, isArray: true},
          options: {method: 'OPTIONS', cache: false}
        });
      }
    };

    $scope.saveWhitelist = function () {
      var whitelist = [];
      var arr = $("#whitelist").val().split('\n');
      for (var i in arr) {
        whitelist.push({
          name: arr[i]
        });
      }
      CsrfService.addResourcesCsrfToHeaders(whitelabelResources().options, $http.defaults.headers.post).then(function (headers) {
        whitelabelResources(headers).post(whitelist).$promise.then(function () {
          toastr.success('Erfolgreich gespeichert');
        }).catch(function (response) {
          console.error('Something went wrong...', response);
        });
      });
    };


    var apiKeyResources = function (headers) {
      if (headers !== undefined) {
        return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/apiKey', {}, {
          post: {method: 'POST', headers: headers, isArray: false}
        });
      } else {
        return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/apiKey', {}, {
          options: {method: 'OPTIONS', cache: false}
        });
      }
    };

    $scope.newApiKey = function () {
      CsrfService.addResourcesCsrfToHeaders(apiKeyResources().options, $http.defaults.headers.post).then(function (headers) {
        apiKeyResources(headers).post({
          id: $routeParams.appId
        }).$promise.then(function (response) {
          $scope.apiKey = response.apiKey;
        }).catch(function (response) {
          handleError(response);
        });
      });
    };

    whitelabelResources().get().$promise.then(function (data) {
      var whitelabels = '';
      angular.forEach(data, function (whitelabel) {
        whitelabels += whitelabel.name + '\n';
      });
      $scope.whitelabels = whitelabels;
    }).catch(function (response) {
      console.error('Something went wrong..', response);
    });

    var appResources = function () {
      return $resource('http://localhost:8080/rest/secure/app', {}, {
        get: {method: 'GET', cache: false, isArray: true},
        options: {method: 'OPTIONS', cache: false}
      });
    };

    appResources().get().$promise.then(function (data) {
      var app = $.grep(data, function (e) {
        return e.id === $routeParams.appId;
      });
      $scope.apiKey = app[0].apiKey;
    }).catch(function (response) {
      handleError(response);
    });

    var handleError = function (response) {
      console.error('Something went wrong...', response);
    };
  });


