(function () {
    "use strict";

    angular
        .module("vaTra")
        .controller("VaTraController", VaTraController);

    VaTraController.$inject = ["$scope", "$state", "$http", "$timeout", "localStorageService"];

    function VaTraController($scope, $state, $http, $timeout, localStorageService) {

    }
})();