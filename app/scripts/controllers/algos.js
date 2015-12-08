'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:AlgosCtrl
 * @description
 * # AlgosCtrl
 * Controller of the vaTraApp
 */
angular.module('vaTraApp')
    .controller('AlgosCtrl', function ($scope, $resource, CsrfService, $routeParams, $timeout, $http) {
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
                algoResources(headers).put({
                    id: $routeParams.appId,
                    algorithms: algos
                }).$promise.then(function () {
                    toastr.success('Erfolgreich gespeichert');
                }).catch(function (response) {
                    console.error('Something went wrong...', response);
                });
            });
        };

        var algoResources = function (headers) {
            if (headers !== undefined) {
                return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/algorithm', {}, {
                    put: {method: 'PUT', headers: headers, isArray: false}
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

    });
