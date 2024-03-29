'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:SchemaCtrl
 * @description
 * # SchemaCtrl
 *
 * Loads the JSON data of the current scheme.
 * Update possibility for the scheme.
 */
angular.module('vaTraApp')
  .controller('SchemaCtrl', function ($scope, $routeParams, $resource, CsrfService, $http) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var container = document.getElementById("jsoneditor");
    var editor = new JSONEditor(container);


    $scope.updateSchema = function () {
      CsrfService.addResourcesCsrfToHeaders(schemaResources().options, $http.defaults.headers.post).then(function (headers) {
        schemaResources(headers).put(
          JSON.stringify(editor.get())
        ).$promise.then(function () {
          toastr.success('Erfolgreich gespeichert');
        }).catch(function (response) {
          console.error('Something went wrong...', response);
        });
      });
    };

    var schemaResources = function (headers) {
      if (headers !== undefined) {
        return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/schema', {}, {
          put: {method: 'PUT', headers: headers, isArray: false}
        });
      } else {
        return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/schema', {}, {
          get: {method: 'GET', cache: false, isArray: true},
          options: {method: 'OPTIONS', cache: false}
        });
      }
    };

    schemaResources().get().$promise.then(function (data) {
      console.log(data[0]);

      if (data[0] !== "") {
        editor.set(JSON.parse(data[0]));
      }

    }).catch(function (response) {
      console.error('Something went wrong...', response);
    });

  });
