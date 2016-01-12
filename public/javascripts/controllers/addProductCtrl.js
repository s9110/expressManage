angular.module('productModule', ['productService'])

.controller('addProductController', ['$scope', 'productFactory',
    function($scope, productFactory) {
        $scope.product = {};

        $scope.addProduct = function() {
            productFactory.create($scope.product);
        };

    }
]);
