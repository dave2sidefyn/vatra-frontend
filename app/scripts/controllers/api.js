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

        whitelabelResources().get().$promise.then(function (data) {
            var whitelabels = '';
            angular.forEach(data, function(whitelabel){
                whitelabels += whitelabel.name + '\n';
            });
            $scope.whitelabels = whitelabels;
        }).catch(function (response) {
            console.error('Something went wrong...', response);
        });
    });
