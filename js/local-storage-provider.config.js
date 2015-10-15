(function(){
    "use strict";

    angular
        .module("vaTra")
        .config(config);

    config.$inject = ["localStorageServiceProvider"];

    function config (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix("vaTra");
    }
})();