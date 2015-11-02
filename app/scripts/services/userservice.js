'use strict';

/**
 * @ngdoc service
 * @name vaTraApp.UserService
 * @description
 * # UserService
 * Service in the vaTraApp.
 */
angular.module('vaTraApp')
  .service('UserService', function ($resource) {
    return $resource('http://localhost:8080/user', {
      query: {method: 'GET', isArray: true}
    });
  });
