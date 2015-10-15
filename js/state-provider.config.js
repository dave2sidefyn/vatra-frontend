(function () {
    "use strict";

    angular
        .module("vaTra")
        .config(config);

    config.$inject = ["$stateProvider", "$locationProvider"];

    function config($stateProvider, $locationProvider) {
        $stateProvider.state("login", {
            url: "/login",
            templateUrl: "/partials/login.html"
        }).state("otherwise", {
            url: "*path",
            controller: ["$state", "$stateParams", function ($state, $stateParams) {
                $state.go("login");
            }]
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
})();