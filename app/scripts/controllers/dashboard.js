'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the vaTraApp
 */
angular.module('vaTraApp')
    .controller('DashboardCtrl', function ($resource, $scope, CsrfService, $http, $location) {
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
                var apps = [];
                data.forEach(function (record) {
                    apps.push({
                        id: record.id,
                        name: record.name,
                        request: record.request,
                        valid: record.valid,
                        invalid: record.invalid,
                        lastRequest: record.lastRequest
                    });
                });

                $scope.apps = apps;

            }).catch(function (response) {
                handleError(response);
            });
        };

        $scope.saveApp = function (appName) {
            $('#domain').parent().removeClass('has-error');

            if (!appName) {
                $('#domain').parent().addClass('has-error');
                toastr.error('App-Name darf nicht leer sein!');
                return;
            }

            CsrfService.addResourcesCsrfToHeaders(appResources().options, $http.defaults.headers.post).then(function (headers) {
                appResources(headers).post({
                    name: appName
                }).$promise.then(function () {
                        $scope.appName = '';
                        getApps();
                    }).catch(function (response) {
                        handleError(response);
                    });
            });
        };

        getApps();

        var handleError = function (response) {
            console.error('Something went wrong...', response);
        };

        $scope.openApp = function (app) {
            $location.url('/app/' + app.id + '/schema');
        };
    });
