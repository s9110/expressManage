angular.module('productModule', ['productService'])

.controller('addProductController', ['$scope', '$http', 'productFactory',
    function($scope, $http, productFactory) {
        $scope.product = {};

        $scope.addProduct = function() {
            productFactory.create($scope.product)

                .success(function(data) {
                    $scope.product.name = 'successful';
                })
        };

    }
]);
