'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:SchemaCtrl
 * @description
 * # SchemaCtrl
 * Controller of the vaTraApp
 */
angular.module('vaTraApp')
    .controller('SchemaCtrl', function () {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];


        var container = document.getElementById("jsoneditor");
        var editor = new JSONEditor(container);

        // set json
        var json = {
            "name": {
                "min": 8,
                "max": 10,
                "required": true
            },
            "email": "VaTra.Regex.Email",
            "payment_receiver": "VaTra.Payment.Receiver",
            "payment_sender": "VaTra.Payment.Sender"
        };

        editor.set(json);

        // get json
        editor.get();

    });
