'use strict';

/**
 * @ngdoc service
 * @name particleApp.api
 * @description
 * # api
 * Service in the particleApp.
 */
angular.module('particleApp')
  .service('api', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var url = 'https://api.particle.io/v1/devices?access_token=d6576383889e1526c95853391923584b508071c4';
    function success(r) {
        console.log(r);
    }
    function fail(r) {
        console.error(r);
    }
    $http.jsonp(url).then(success(),fail());
  });
