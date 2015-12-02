'use strict';

/**
 * @ngdoc function
 * @name vaTraApp.controller:AlgosCtrl
 * @description
 * # AlgosCtrl
 * Controller of the vaTraApp
 */
angular.module('vaTraApp')
  .controller('AlgosCtrl', function ($scope, UserService, $) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.users = UserService.query();


    // use jquery switch
    $(".switch").bootstrapSwitch();

  });
