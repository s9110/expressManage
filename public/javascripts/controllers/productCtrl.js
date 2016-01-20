var productModule = angular.module('productModule', ['productService']);

productModule.controller('GetProductsCtrl', ['$scope', '$http', 'productFactory',
    function($scope, $http, productFactory) {
        console.log('..GetProductsCtrl');

        // Objects
        $scope.product = {};

        // Arrays
        $scope.products = [];

        // Booleans
        $scope.loading = false;

        $scope.getProducts = function() {
            console.log('..$scope.getProducts');
            $scope.loading = true;

            productFactory.get()
                .success(function(data) {
                    $scope.loading = false;
                    $scope.products = data;
                })

            // More error handling code to be added
            .error(function(data) {
                $scope.loading = false;
                console.log('..error data: ', data);
            })
        }

        // Call $scope.getProducts()
        $scope.getProducts();

    }
]);

productModule.controller('AddProductCtrl', ['$scope', '$http', 'productFactory',
    function($scope, $http, productFactory) {
        console.log('..AddProductCtrl');

        // Objects
        $scope.product = {};
        $scope.successProduct = {};

        // Arrays
        $scope.products = [];

        // Booleans
        $scope.loading = false;
        $scope.success = false;
        $scope.insert = true;

        $scope.addProduct = function() {
            console.log('..$scope.addProduct');
            $scope.loading = true;

            productFactory.create($scope.product)
                .success(function(data) {
                    $scope.loading = false;
                    $scope.success = true;
                    $scope.successProduct = data;
                    $scope.product = {};
                })

            // More error handling code to be added
            .error(function(data) {
                $scope.loading = false;
                console.log('..error data: ', data);
            })
        }

    }
]);

productModule.controller('EditProductCtrl', ['$scope', '$location', '$routeParams', 'productFactory',
    function($scope, $location, $routeParams, productFactory) {
        console.log('..EditProductCtrl');
        console.log('..EditProductCtrl -> $routeParams.id: ' + $routeParams.id);

        $scope.product = {};

        // Arrays
        $scope.products = [];

        // Booleans
        $scope.loading = false;
        $scope.success = false;
        $scope.update = true;

        var Products = productFactory.update();

        Products.get({
            id: $routeParams.id
        }, function(product) {
            $scope.product = product;
        });

        $scope.updateProduct = function() {
            console.log('..$scope.updateProduct');
            $scope.loading = true;

            Products.update($scope.product, function(data) {
                console.log('..$scope.updateProduct -> data: ', data);

                if(data.$resolved == true) {
                    $scope.loading = false;
                    $scope.success = true;
                    $scope.successProduct = $scope.product;

                } else {
                    $scope.loading = false;
                    console.log('..data: ', data);
                }
                // $location.path('/');
            });
        }
    }
]);
