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
                // .error(function(data) {
                //     $scope.loading = false;
                // })
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
                // .error(function(data) {
                //     $scope.loading = false;
                // })
        }

    }
]);

productModule.controller('EditProductCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        console.log('..EditProductCtrl');

        var Products = $resource('/api/product/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Products.get({ id: $routeParams.id }, function(product) {
            $scope.product = product;
        });

        $scope.update = function() {
            console.log('..$scope.update');

            Products.update($scope.product, function() {
                $location.path('/');
            });
        }
    }
]);
