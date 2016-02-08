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
        $scope.rawOrderProduct = {};

        // Arrays
        $scope.products = [];
        $scope.orderProducts = [];
        $scope.customers = [];

        // Booleans
        $scope.loading = false;
        $scope.success = false;
        $scope.insert = true;
        $scope.orderProductsEmpty;

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
                if (_.get(value, 'name') === $scope.rawOrderProduct.name) {
                    $scope.product = value;
                    // #TODO: Remove it from array to avoid duplication
                    return false;
                } else {
                    $scope.product = {};
                    return true;
                }
            });
        }

        $scope.addNewOrderDetailRow = function() {
            console.log('..addNewOrderDetailRow');

            // if orderProducts array is blank, add new standard product
            if ($scope.orderProducts.length === 0) {
                $scope.orderProductsEmpty = true;
            }

            // push rawOrderProduct to orderProducts array
            if(_.values($scope.product).length > 0) {
                $scope.orderProducts.push($scope.product);
                $scope.product = {};
                $scope.rawOrderProduct = {};
            }
        }

        $scope.editOrderDetailRow = function(index) {
            console.log('..editOrderDetailRow');

            if(index != null && index != '') {
                // this thing is not working yet
                $scope.rawOrderProduct.name = $scope.orderProducts[index].name;
                console.log('... $scope.orderProducts[index].name : ', $scope.orderProducts[index].name);

                // Get element from array
                $scope.product = $scope.orderProducts[index];
                // Remove it from array so that to be saved after edit
                $scope.removeOrderDetailRow(index);
            }
        }

        $scope.removeOrderDetailRow = function(index) {
            console.log('..removeOrderDetailRow');

            if(index != null && index != '') {
                $scope.orderProducts.splice(index, 1);
            }
            // #TODO: Logic to remove 0th element

            console.log('..after removal $scope.orderProducts: ', $scope.orderProducts);
        }


        //
        // Methods to call on controller load
        //
        // Call to get all customers
        $scope.getCustomers();

        // Call to get all product details
        $scope.getProducts();

        // initialize order detail table
        $scope.addNewOrderDetailRow();
    }
]);
