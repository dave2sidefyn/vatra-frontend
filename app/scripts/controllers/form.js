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
        $scope.currencies = [
            {id: "CHF", name: "CHF"},
            {id: "EUR", name: "EUR"},
            {id: "USD", name: "USD"}
        ];

        var savePosition = function(position) {
            $scope.form.latitude = position.coords.latitude.toString();
            $scope.form.longitude = position.coords.longitude.toString();

            // Longitude and latitude of Amsterdam
            //$scope.form.latitude = "52.370216";
            //$scope.form.longitude = "4.895168";
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(savePosition);
        }

        $scope.submit = function () {
            $http.post("http://vatra-php", $scope.form, {headers : {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }}).success(function(data) {
                $('#payment-form').hide();
                if (data === 'true') {
                    $('#success-message').show();
                } else {
                    $('#error-message').show();
                }
            });
        };
    });
