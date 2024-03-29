var inOrderModule = angular.module('inOrderModule', ['productService', 'customerService', 'inOrderService', 'sequenceNumberService']);

inOrderModule.controller('GetInOrderCtrl', ['$scope', '$http', 'inOrderFactory',
    function($scope, $http, inOrderFactory) {
        console.log('..GetInOrderCtrl');

        // Arrays
        $scope.inOrders = [];

        // Booleans
        $scope.loading = false;
        $scope.success = false;

        $scope.getInOrders = function() {
            console.log('..$scope.getInOrders');
            $scope.loading = true;

            inOrderFactory.get()
                .success(function(data) {
                    $scope.loading = false;
                    $scope.success = true;
                    $scope.inOrders = data;
                })

            // More error handling code to be added
            .error(function(data) {
                $scope.loading = false;
                $scope.success = false;
                console.log('..error data: ', data);
            })
        }

        $scope.init = function() {
            // Call getInOrders
            $scope.getInOrders();
        }

        $scope.init();
    }
]);

inOrderModule.controller('AddInOrderCtrl', ['$scope', '$http', 'productFactory', 'customerFactory', 'inOrderFactory', 'sequenceNumberFactory',
    function($scope, $http, productFactory, customerFactory, inOrderFactory, sequenceNumberFactory) {
        console.log('..AddInOrderCtrl');

        // initialize datepicker
        initDatePicker();

        // Page UI values
        $scope.headerTitle = 'New In Order';

        // Objects
        $scope.order = {};
        $scope.product = {};
        $scope.rawOrderProduct = {};
        $scope.counterObj = {};

        // Arrays
        $scope.order.orderProducts = [];
        $scope.products = [];
        $scope.customers = [];

        // Booleans
        $scope.loading = false;
        $scope.success = false;
        $scope.insert = true;
        $scope.isEditRow = false;

        $scope.getLotNumberTest = function() {
            console.log('..$scope.getLotNumberTest');

            sequenceNumberFactory.get({
                sequenceName: 'lotNumber'
            }, function(lotNumber) {
                $scope.counterObj = lotNumber;
            });
            console.log('..before if $scope.counterObj: ', $scope.counterObj);

            if ( !($scope.counterObj.sequenceValue) ) {
                console.log('..in If');

                var initialLotNumRecord = {
                    sequenceName: 'lotNumber',
                    sequenceValue: 1
                };

                sequenceNumberFactory.create(initialLotNumRecord)
                    .success(function(data) {
                        $scope.counterObj = data;
                        console.log('.. Success data: ', data);
                    })
                    .error(function(data) {
                        console.log('.. Error data: ', data);
                    })
            }

            console.log('..$scope.counterObj: ', $scope.counterObj);
        }


        $scope.getLotNumber = function() {
            console.log('..$scope.getLotNumber');
            $scope.loading = true;

            inOrderFactory.get()
                .success(function(data) {
                    $scope.loading = false;
                    $scope.order.lotNumber = data.length + 1;
                })

            // More error handling code to be added
            .error(function(data) {
                $scope.loading = false;
                $scope.errorData = data;
                console.log('..error data: ', data);
            })
        }

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
                    $scope.isEditRow = true;

                    // To avoid duplicate addition
                    $scope.products.splice(key, 1);
                    return false;

                } else {
                    $scope.product = {};
                    return true;
                }
            });
        }

        $scope.addNewOrderDetailRow = function() {
            console.log('..addNewOrderDetailRow');

            $scope.isEditRow = false;

            // push rawOrderProduct to order.orderProducts array
            if (_.values($scope.product).length > 0) {
                $scope.order.orderProducts.push($scope.product);
                $scope.product = {};
                $scope.rawOrderProduct = {};
            }
        }

        $scope.editOrderDetailRow = function(index) {
            console.log('..editOrderDetailRow -> index: ', index);

            $scope.isEditRow = true;

            if (index != null) {
                $scope.rawOrderProduct.name = $scope.order.orderProducts[index].name;

                // Get element from array
                $scope.product = $scope.order.orderProducts[index];
                // Remove it from $scope.order.orderProduct array so that to be saved after edit
                // $scope.removeOrderDetailRow(index);
                $scope.order.orderProducts.splice(index, 1)
            }
        }

        $scope.removeOrderDetailRow = function(index) {
            console.log('..removeOrderDetailRow -> index: ', index);

            if (index != null) {
                var splicedArray = $scope.order.orderProducts.splice(index, 1);

                // Add this element back to available options
                var arrayElement = splicedArray[0];
                arrayElement.quantity = '';
                arrayElement.discount = '';
                $scope.products.push(arrayElement);
            }
        }

        $scope.addInOrder = function() {
            console.log('..$scope.addInOrder');
            $scope.loading = true;

            inOrderFactory.create($scope.order)
                .success(function(data) {
                    $scope.loading = false;
                    $scope.success = true;
                    // $scope.successOrder = data;
                    // $scope.order = {};
                    // $scope.init();
                    disableInputInOrderSuccess();
                })

            // More error handling code to be added
            .error(function(data) {
                $scope.loading = false;
                $scope.success = false;
                console.log('..error data: ', data);
            })
        }

        $scope.init = function() {
            console.log('..init');
            // Call to get lot number
            $scope.getLotNumber();
            // Test method
            $scope.getLotNumberTest();
            // Call to get all customers
            $scope.getCustomers();
            // Call to get all product details
            $scope.getProducts();
            // initialize order detail table
            $scope.addNewOrderDetailRow();
        }

        //
        // Methods to call on controller load
        //
        $scope.init();

    }
]);

inOrderModule.controller('EditInOrderCtrl', ['$scope', '$location', '$routeParams', 'productFactory', 'customerFactory', 'inOrderFactory',
    function($scope, $location, $routeParams, productFactory, customerFactory, inOrderFactory) {
        console.log('..EditInOrderCtrl');
        console.log('..EditInOrderCtrl -> $routeParams.id: ' + $routeParams.id);

        // Page UI Values
        $scope.headerTitle = 'Edit In Order';

        // Objects
        $scope.order = {};
        $scope.product = {};
        $scope.rawOrderProduct = {};

        // Arrays
        $scope.order.orderProducts = [];
        $scope.products = [];
        $scope.customers = [];

        // Booleans
        $scope.loading = false;
        $scope.success = false;
        $scope.update = true;
        $scope.isEditRow = false;

        var InOrder = inOrderFactory.update();

        InOrder.get({
            id: $routeParams.id
        }, function(inOrder) {
            $scope.order = inOrder;
        });
        $scope.loading = false;

        $scope.getLotNumber = function() {
            console.log('..$scope.getLotNumber');;
            $scope.loading = true;

            inOrderFactory.get()
                .success(function(data) {
                    $scope.loading = false;
                    $scope.order.lotNumber = data.length + 1;
                })

            // More error handling code to be added
            .error(function(data) {
                $scope.loading = false;
                $scope.errorData = data;
                console.log('..error data: ', data);
            })
        }

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
                    $scope.isEditRow = true;

                    // To avoid duplicate addition
                    $scope.products.splice(key, 1);
                    return false;

                } else {
                    $scope.product = {};
                    return true;
                }
            });
        }

        $scope.addNewOrderDetailRow = function() {
            console.log('..addNewOrderDetailRow');

            $scope.isEditRow = false;

            // push rawOrderProduct to order.orderProducts array
            if (_.values($scope.product).length > 0) {
                $scope.order.orderProducts.push($scope.product);
                $scope.product = {};
                $scope.rawOrderProduct = {};
            }
        }

        $scope.editOrderDetailRow = function(index) {
            console.log('..editOrderDetailRow -> index: ', index);

            $scope.isEditRow = true;

            if (index != null) {
                $scope.rawOrderProduct.name = $scope.order.orderProducts[index].name;

                // Get element from array
                $scope.product = $scope.order.orderProducts[index];
                // Remove it from $scope.order.orderProduct array so that to be saved after edit
                // $scope.removeOrderDetailRow(index);
                $scope.order.orderProducts.splice(index, 1)
            }
        }

        $scope.removeOrderDetailRow = function(index) {
            console.log('..removeOrderDetailRow -> index: ', index);

            if (index != null) {
                var splicedArray = $scope.order.orderProducts.splice(index, 1);

                // Add this element back to available options
                var arrayElement = splicedArray[0];
                arrayElement.quantity = '';
                arrayElement.discount = '';
                $scope.products.push(arrayElement);
            }
        }

        $scope.updateInOrder = function() {
            console.log('..$scope.updateInOrder');
            $scope.loading = true;

            InOrder.update($scope.order, function(data) {
                console.log('..$scope.updateInOrder -> data: ', data);

                if (data.$resolved == true) {
                    $scope.loading = false;
                    $scope.success = true;

                } else {
                    $scope.loading = false;
                    $scope.success = false;
                    console.log('..Error data: ', data);
                }
            });
        }

        $scope.init = function() {
            console.log('..init');
            // Call to get lot number
            $scope.getLotNumber();
            // Call to get all customers
            $scope.getCustomers();
            // Call to get all product details
            $scope.getProducts();
            // initialize order detail table
            $scope.addNewOrderDetailRow();
        }

        //
        // Methods to call on controller load
        //
        $scope.init();
    }
]);

inOrderModule.controller('DeleteInOrderCtrl', ['$scope', '$location', '$routeParams', 'inOrderFactory',
    function($scope, $location, $routeParams, inOrderFactory) {
        console.log('..DeleteInOrderCtrl');
        console.log('..DeleteInOrderCtrl -> $routeParams.id: ' + $routeParams.id);

        // Mark form fields disabled
        markDisableInDelete();

        // Page UI values
        $scope.headerTitle = 'Delete In Order';
        $scope.message = 'Are you sure you want to delete this in-order?';

        // Objects
        $scope.order = {};

        // Booleans
        $scope.loading = true;
        $scope.success = true;
        $scope.delete = true;

        var InOrder = inOrderFactory.delete();

        InOrder.get({
            id: $routeParams.id
        }, function(inOrder) {
            $scope.order = inOrder;
        });
        $scope.loading = false;

        $scope.deleteInOrder = function() {
            $scope.loading = true;

            InOrder.delete({
                id: $routeParams.id
            }, function(inOrder) {
                console.log('..$scope.deleteInOrder -> inOrder: ', inOrder);

                if (inOrder.$resolved == true) {
                    $scope.loading = false;
                    $scope.order = {}

                    $location.path('/viewinorders');

                } else {
                    $scope.loading = false;
                    console.log('..inOrder: ', inOrder);
                }
            });
        }
    }
])
