angular.module('productModule', ['productService'])

.controller('productController', ['$scope', '$http', '$location', 'productFactory',
    function($scope, $http, $location, productFactory) {
        $scope.product = {};
        $scope.products = [];
        $scope.loading = false;

        $scope.addProduct = function() {
            $scope.loading = true;

            productFactory.create($scope.product)

            .success(function(data) {
                $scope.loading = false;
                $scope.product = {};
            })
        };

        $scope.getProducts = function() {
            $scope.loading = true;

            // productFactory.get().then(successGetProducts(data), errorGetProducts(data));
            productFactory.get()
                .success(function(data) {
                    $scope.loading = false;
                    $scope.products = data;
                })
        }

        // var successGetProducts = function() {
        //     $scope.loading = false;
        //     $scope.products = data;
        // }
        //
        // var errorGetProducts = function() {
        //     console.log('Oh snap!! Something went wrong!!!');
        // }

        // get all products only if view product partial is being shown
        console.log('... this is location : ', $location);
        console.log('... this is $location.$$url : ', $location.$$url);
        if ($location.$$url == '/viewproducts') {
            $scope.getProducts();
        }
    }

]);
