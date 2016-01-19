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

productModule.controller('EditProductCtrl', ['$scope', '$routeParams', 'productFactory',
    function($scope, $routeParams, productFactory) {
        console.log('..EditProductCtrl');
        console.log('..EditProductCtrl -> $routeParams.id: ' + $routeParams.id);

        $scope.product = {};

        // Arrays
        $scope.products = [];

        // Booleans
        $scope.loading = false;
        $scope.success = false;

        $scope.getOne = function() {
            console.log('..$scope.getOne');
            $scope.loading = true;

            productFactory.getOne($routeParams.id)
                .success(function(data) {
                    $scope.loading = false;
                    $scope.success = true;
                    $scope.successProduct = data;
                    $scope.product = {};
                })

            .error(function(data) {
                $scope.loading = false;
                $scope.success = false;
                console.log('..some error: ', data);
            })
        }

        $scope.getOne();
        // ProductsResource.get({
        //     id: $routeParams.id
        // }, function(product) {
        //     $scope.product = product;
        // });

        // carsRes.cars.get(function(response) {
        //     // We now have a completed ajax call, with the response
        //     $scope.cars = response;
        // });
        //
        // scope.user = User.get({
        //     username: 'bob'
        // });
        // scope.user.$promise.then(function(data) {
        //     console.log(data);
        // });


        // $scope.update = function() {
        //     console.log('..$scope.update');
        //
        //     ProductsResource.update($scope.product, function() {
        //         $location.path('/');
        //     });
        // }
    }
]);
