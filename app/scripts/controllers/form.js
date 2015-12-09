'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the vaTraApp
 */
angular.module('vaTraApp')
    .controller('FormCtrl', function ($scope, $http) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.submit = function () {
            $http.post("http://form.vatra.kioh.ch", $scope.form, {headers : {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }}).success(function(data, status) {
                if (data == 'true') {
                    toastr.info('Erfolgreich');
                } else {
                    toastr.error('Fehlgeschlagen');
                }
            });
        };
    });
