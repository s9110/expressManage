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
            .error(function(data) {
                $scope.loading = false;
                console.log('..error data: ', data);
            })
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
            .error(function(data) {
                $scope.loading = false;
                console.log('..error data: ', data);
            })
        }

    }
]);

customerModule.controller('EditCustomerCtrl', ['$scope', '$location', '$routeParams',
    'customerFactory',
    function($scope, $location, $routeParams, customerFactory) {
        console.log('..customerFactory');
        console.log('..customerFactory -> $routeParams.id: ' + $routeParams.id);

        // Objects
        $scope.customer = {};
        $scope.successCustomer = {};

        // Arrays
        $scope.customers = [];

        // Booleans
        $scope.loading = false;
        $scope.success = false;
        $scope.update = true;

        var Customers = customerFactory.update();

        Customers.get({
            id: $routeParams.id
        }, function(customer) {
            $scope.customer = customer;
        });

        $scope.updateCustomer = function() {
            console.log('..$scope.updateCustomer');
            $scope.loading = true;

            Customers.update($scope.customer, function(data) {
                console.log('..$scope.updateCustomer -> data: ', data);

                if (data.$resolved == true) {
                    $scope.loading = false;
                    $scope.success = true;
                    $scope.successCustomer = $scope.customer;

                } else {
                    $scope.loading = false;
                    console.log('..data: ', data);
                }
                // $location.path('/');
            });
        }
    }
]);

customerModule.controller('DeleteCustomerCtrl', ['$scope', '$location', '$routeParams',
    'customerFactory',
    function($scope, $location, $routeParams, customerFactory) {
        console.log('..DeleteCustomerCtrl');
        console.log('..DeleteCustomerCtrl -> $routeParams.id: ' + $routeParams.id);

        // Objects
        $scope.customer = {};

        // Booleans
        $scope.loading = true;

        var Customers = customerFactory.delete();

        Customers.get({
            id: $routeParams.id
        }, function(customer) {
            $scope.customer = customer;
        });
        $scope.loading = false;

        $scope.deleteCustomer = function() {
            $scope.loading = true;

            Customers.delete({
                id: $routeParams.id
            }, function(customer) {
                console.log('..$scope.deleteCustomer -> customer: ', customer);

                if (customer.$resolved == true) {
                    $scope.loading = false;
                    $scope.customer = {};

                    $location.path('/viewcustomers');
                } else {
                    $scope.loading = false;
                    console.log('..customer: ', customer);
                }
            });
        }
    }
]);
