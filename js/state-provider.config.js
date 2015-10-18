(function () {
    "use strict";

    angular
        .module("vaTra")
        .config(config);

    config.$inject = ["$stateProvider", "$locationProvider"];

    function config($stateProvider, $locationProvider) {
        $stateProvider.state("frontend-form", {
            url: "/form",
            templateUrl: "/partials/frontend-form.html"
        }).state("login", {
            url: "/login",
            templateUrl: "/partials/login.html"
        }).state("otherwise", {
            url: "*path",
            controller: ["$state", "$stateParams", function ($state, $stateParams) {
                $state.go("frontend-form");
            }]
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
})();