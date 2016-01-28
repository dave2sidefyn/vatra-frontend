'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:AlgosCtrl
 * @description
 * # AlgosCtrl
 *
 * This controller can enable and disable the algorithms of the current application.
 */
angular.module('vaTraApp')
  .controller('AlgosCtrl', function ($scope, $resource, CsrfService, $routeParams, $timeout, $http, $filter) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $('body').on('switchChange.bootstrapSwitch', '.switch', function () {
      var algos = [];
      $('.switch:checked').each(function () {
        algos.push({id: $(this).data('id')});
      });
      updateAlgo(algos);
    });

    var updateAlgo = function (algos) {
      CsrfService.addResourcesCsrfToHeaders(algoResources().options, $http.defaults.headers.post).then(function (headers) {
        algoResources(headers).post(algos).$promise.then(function () {
          toastr.remove();
          toastr.success('Erfolgreich gespeichert');
        }).catch(function (response) {
          console.error('Something went wrong...', response);
        });
      });
    };

    var algoResources = function (headers) {
      if (headers !== undefined) {
        return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/algorithm', {}, {
          post: {method: 'POST', headers: headers, isArray: false}
        });
      } else {
        return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/algorithm', {}, {
          get: {method: 'GET', cache: false, isArray: true},
          options: {method: 'OPTIONS', cache: false}
        });
      }
    };

    algoResources().get().$promise.then(function (data) {
      $scope.algos = data;
      $timeout(function () {
        $(".switch").bootstrapSwitch();
      }, 200);
    }).catch(function (response) {
      console.error('Something went wrong...', response);
    });

    var schemaResources = function () {
      return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/schema', {}, {
        get: {method: 'GET', cache: false, isArray: true},

      });

    };

    schemaResources().get().$promise.then(function (data) {
      console.log(data[0]);

      if (data[0] !== "") {
        var items = [];
        data = JSON.parse(data[0]);
        Object.keys(data).forEach(function (key) {
          items.push({key: key, value: data[key]});
        });
        $scope.schema = items;
      }

    }).catch(function (response) {
      console.error('Something went wrong...', response);
    });

    $scope.isInSchema = function (key) {
      return ($filter('filter')($scope.schema, {value: key})).length > 0;
    }

  });
