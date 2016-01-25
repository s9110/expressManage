var expressManageModule = angular.module('expressManageModule', ['productService', 'customerService']);

expressManageModule.controller('ExpressManageInitCtrl', ['$scope', 'productFactory', 'customerFactory',
    function($scope, productFactory, customerFactory) {
        console.log('..ExpressManageInitCtrl');

        // Objects
        $scope.errorData = {};

        // Arrays
        $scope.productCount = 0;
        $scope.customerCount = 0;

        // Booleans
        $scope.loading = false;
        $scope.success = false;

        $scope.getProductCount = function() {
            console.log('..$scope.getProductCount');
            $scope.loading = true;

            productFactory.get()
                .success(function(data) {
                    $scope.loading = false;
                    $scope.success = true;

                    $scope.productCount = data.length;
                    console.log('.. $scope.productCount: ', $scope.productCount);
                })

                .error(function(data) {
                    $scope.loading = false;
                    $scope.success = false;

                    $scope.errorData = data;
                    console.log('.. Error: ', data);
                })
        }

        $scope.getCustomerCount = function() {
            console.log('..$scope.getCustomerCount');
            $scope.loading = true;

            customerFactory.get()
                .success(function(data) {
                    $scope.loading = false;
                    $scope.success = true;

                    $scope.customerCount = data.length;
                    console.log('..$scope.customerCount: ', $scope.customerCount);
                })

                .error(function(data) {
                    $scope.loading = false;
                    $scope.success = false;

                    $scope.errorData = data;
                    console.log('.. Error: ', data);
                })
        }

        $scope.getProductCount();
        $scope.getCustomerCount();
    }
]);
