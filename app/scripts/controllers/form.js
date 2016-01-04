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
        $scope.form = {};
        $scope.form.currency = "CHF";

        var savePosition = function(position) {
            $scope.form.latitude = position.coords.latitude.toString();
            $scope.form.longitude = position.coords.longitude.toString();

            // Longitude and latitude of Silicon Valley (California)
            //$scope.form.latitude = "37.387474";
            //$scope.form.longitude = "-122.057543";
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(savePosition);
        }

        $scope.submit = function () {
            $http.post("http://vatra-php", $scope.form, {headers : {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }}).success(function(data, status) {
                $('#payment-form').hide();
                if (data == 'true') {
                    $('#success-message').show();
                } else {
                    $('#error-message').show();
                }
            });
        };
    });
