'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:ApiCtrl
 * @description
 * # ApiCtrl
 *
 * This controller loads the whitelist and API key of the current application.
 * Offers possibility to change the whitelist and to update the API key.
 */
angular.module('vaTraApp')
  .controller('ApiCtrl', function ($scope, $resource, $routeParams, CsrfService, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var whitelistResources = function (headers) {
      if (headers !== undefined) {
        return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/whitelistlabel', {}, {
          post: {method: 'POST', headers: headers, isArray: false}
        });
      } else {
        return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/whitelistlabel', {}, {
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
      CsrfService.addResourcesCsrfToHeaders(whitelistResources().options, $http.defaults.headers.post).then(function (headers) {
        whitelistResources(headers).post(whitelist).$promise.then(function () {
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

    whitelistResources().get().$promise.then(function (data) {
      var whitelist = '';
      angular.forEach(data, function (whitelistlabel) {
        whitelist += whitelistlabel.name + '\n';
      });
      $scope.whitelist = whitelist;
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


