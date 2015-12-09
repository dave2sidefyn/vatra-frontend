'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:SecurityCtrl
 * @description
 * # SecurityCtrl
 * Controller of the vaTraApp
 */
angular.module('vaTraApp')
    .controller('SecurityCtrl', function ($scope, $routeParams, $resource, CsrfService, $http) {

        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var rangeSlider = document.getElementById('slider-range');

        noUiSlider.create(rangeSlider, {
            start: [10],
            step: 1,
            range: {
                'min': [0],
                'max': [10]
            },
            format: wNumb({
                decimals: 0
            })
        }).on('update', function (value) {
            $('#tolerance').text(value);
        });

        $scope.updateTolerance = function () {
            CsrfService.addResourcesCsrfToHeaders(securityResources().options, $http.defaults.headers.post).then(function (headers) {
                securityResources(headers).put({
                    toleranz: parseInt(rangeSlider.noUiSlider.get())
                }).$promise.then(function () {
                        toastr.success('Erfolgreich gespeichert');
                    }).catch(function (response) {
                        console.error('Something went wrong...', response);
                    });
            });
        };

        var securityResources = function (headers) {
            if (headers !== undefined) {
                return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/toleranz', {}, {
                    put: {method: 'PUT', headers: headers, isArray: false}
                });
            } else {
                return $resource('http://localhost:8080/rest/secure/app/' + $routeParams.appId + '/toleranz', {}, {
                    get: {method: 'GET', cache: false, isArray: true},
                    options: {method: 'OPTIONS', cache: false}
                });
            }
        };

        securityResources().get().$promise.then(function (data) {
            rangeSlider.noUiSlider.set(data[0]);
        }).catch(function (response) {
            console.error('Something went wrong...', response);
        });

    });
