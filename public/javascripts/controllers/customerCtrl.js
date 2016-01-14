angular.module('customerModule', ['customerService'])

.controller('customerController', ['$scope', '$http', '$location', 'customerFactory',
    function($scope, $http, $location, customerFactory) {
        $scope.customer = {};
        $scope.customers = [];
        $scope.loading = false;
        $scope.success = false;
        $scope.successCustomer = {};

        $scope.addCustomer = function() {
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
        };

        $scope.getCustomer = function() {
            $scope.loading = true;

            // customerFactory.get().then(successGetProducts(data), errorGetProducts(data));
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
        if ($location.$$url == '/viewcustomers') {
            $scope.getCustomer();
        }
    }

]);
