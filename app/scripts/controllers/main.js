'use strict';

/**
 * @ngdoc function
 * @name particleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the particleApp
 */
angular.module('particleApp')
  .controller('MainCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    var at = 'd6576383889e1526c95853391923584b508071c4';
    var url = 'https://api.particle.io/v1/devices?access_token=' + at;
    var _ = $rootScope._;

    $http.get(url).then(function(response) {
      $scope.devices = response.data;
      $scope.currentDevice = currentDevice(response.data[0].id);
      fetchData($scope.currentDevice.id);
    });
    console.log($scope);

    $scope.updateDevice = function(id) {
      $scope.currentDevice = currentDevice(id);
      fetchData(id);
    };

    function currentDevice(id) {
      return _.find($scope.devices, ['id', id]);
    }

    function getDeviceInfo(id) {
      var deviceInfoUrl = 'https://api.particle.io/v1/devices/' + id + '\?access_token\=' + at;
      $http.get(deviceInfoUrl).then(function(response) {
        $scope.currentDeviceInfo = response.data;
        console.log('$scope.currentDeviceInfo');
        console.log($scope.currentDeviceInfo);
        getVariableVal(id);

        $scope.functionNames = angular.forEach(response.data.functions, function(name){return name;});
        getFunctions($scope.functionNames, id);
      });
    }

    function getVariableVal(id) {
      var deviceVar = Object.keys($scope.currentDeviceInfo.variables)[0];
      console.log('device var: ' + deviceVar);
      var variableValUrl = 'https://api.particle.io/v1/devices/' + id + '/' + deviceVar + '\?access_token\=' + at;
      $http.get(variableValUrl).then(function(response) {
        $scope.variableValInfo = response.data;
        console.log('$scope.variableValInfo');
        console.log($scope.variableValInfo);
        //   angular.forEach($scope.devices, function())
      });
    }

    function getFunctions(funcs, id) {
        angular.forEach(funcs, function(func) {
            console.log(func);
            console.log(id);
            var variableValUrl = 'https://api.particle.io/v1/devices/' + id + '/' + func;
            var data = {key: 'arg=random text&access_token='+ at};
            $http.post(variableValUrl, data).then(function(response) {
              $scope.functionInfo = response.data;
              console.log('$scope.functionInfo');
              console.log($scope.functionInfo);
            });
        });

    }

    function fetchData(id) {
      getDeviceInfo(id);
    }
  }]);
