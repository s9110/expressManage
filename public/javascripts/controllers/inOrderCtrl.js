var inOrderModule = angular.module('inOrderModule', []);

inOrderModule.controller('AddInOrderCtrl', ['$scope', '$http',
    function($scope, $http) {
        console.log('..AddInOrderCtrl');

        // Page UI values
        $scope.headerTitle = 'New In Order';
        $scope.message = '';

        // // Objects
        // $scope.product = {};
        // $scope.successProduct = {};

        // // Arrays
        // $scope.products = [];

        // // Booleans
        // $scope.loading = false;
        // $scope.success = false;
        // $scope.insert = true;
    }
]);
