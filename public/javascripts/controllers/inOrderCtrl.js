var inOrderModule = angular.module('inOrderModule', ['productService', 'customerService']);

inOrderModule.controller('AddInOrderCtrl', ['$scope', '$http', 'productFactory', 'customerFactory',
    function($scope, $http, productFactory, customerFactory) {
        console.log('..AddInOrderCtrl');

        // initialize datepicker
        initDatePicker();

        // Page UI values
        $scope.headerTitle = 'New In Order';

        // Objects
        $scope.order = {};
        $scope.product = {};
        $scope.selectedProduct = {};

        // Arrays
        $scope.products = [];
        $scope.customers = [];

        // Booleans
        $scope.loading = false;
        $scope.success = false;
        $scope.insert = true;

        $scope.getCustomers = function() {
            console.log('..$scope.getCustomers');
            $scope.loading = true;

            customerFactory.get()
                .success(function(data) {
                    $scope.loading = false;
                    $scope.customers = data;

                    // initialize customer name autocomplete
                    initCustomerNameAutocomplete($scope.customers);
                })

            // More error handling code to be added
            .error(function(data) {
                $scope.loading = false;
                $scope.errorData = data;
                console.log('..error data: ', data);
            })
        }

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

        $scope.getSelectedProductDetails = function() {
            console.log('..$scope.getSelectedProductDetails');

            _.forEach($scope.products, function(value, key) {
                if (_.get(value, 'name') === $scope.selectedProduct.name) {
                    $scope.product = value;
                    $scope.selectedProduct = {};
                    return false;
                } else {
                    $scope.product = {};
                    return true;
                }
            });
        }

        // Call to get all customers
        $scope.getCustomers();

        // Call to get all product details
        $scope.getProducts();

    }
]);
