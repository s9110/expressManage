var customerModule = angular.module('customerModule', ['customerService']);

customerModule.controller('GetCustomersCtrl', ['$scope', '$http', 'customerFactory',
    function($scope, $http, customerFactory) {
        console.log('..GetCustomerCtrl');

        // Objects
        $scope.customer = {};
        $scope.successCustomer = {};

        // Arrays
        $scope.customers = [];

        // Booleans
        $scope.loading = false;
        $scope.success = false;

        $scope.getCustomers = function() {
            console.log('..$scope.getCustomers');
            $scope.loading = true;

            customerFactory.get()
                .success(function(data) {
                    $scope.loading = false;
                    $scope.customers = data;
                })

                // More error handling code to be added
                // .error(function(data) {
                //     $scope.loading = false;
                // })
        }

        // Call getCustomer()
        $scope.getCustomers();

    }
]);

customerModule.controller('SaveCustomerCtrl', ['$scope', '$http', 'customerFactory',
    function($scope, $http, customerFactory) {
        console.log('..SaveCustomerCtrl');

        // Objects
        $scope.customer = {};
        $scope.successCustomer = {};

        // Arrays
        $scope.customers = [];

        // Booleans
        $scope.loading = false;
        $scope.success = false;

        $scope.addCustomer = function() {
            console.log('..$scope.addCustomer');
            $scope.loading = true;

            customerFactory.create($scope.customer)
                .success(function(data) {
                    $scope.loading = false;
                    $scope.success = true;
                    $scope.successCustomer = data;
                    $scope.customer = {};
                })

                // More error handling code to be added
                // .error(function(data) {
                //     $scope.loading = false;
                // })
        }

    }
]);
