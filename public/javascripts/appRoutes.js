angular.module('appRoutes', ['productModule'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    //
    // HOME PAGE
    //
    .when('/', {
        templateUrl: 'partials/dashboard.html',
        controller: 'ExpressManageInitCtrl'
    })

    //
    // UNDER-CONSTRUCTION
    //
    .when('/underconstruction', {
        templateUrl: 'partials/underConstruction.html',
        controller: 'UnderConstructionCtrl'
    })

    //
    // PRODUCTS
    //

    // Add Product
    .when('/addproduct', {
        templateUrl: 'partials/products.html',
        controller: 'AddProductCtrl'
    })

    // Edit Product
    .when('/product/:id', {
        templateUrl: 'partials/products.html',
        controller: 'EditProductCtrl'
    })

    // Delete Product
    .when('/product/delete/:id', {
        templateUrl: 'partials/products.html',
        controller: 'DeleteProductCtrl'
    })

    // View Products
    .when('/viewproducts', {
        templateUrl: 'partials/listProducts.html',
        controller: 'GetProductsCtrl'
    })

    //
    // CUSTOMERS
    //

    // Add Customer
    .when('/addcustomer', {
        templateUrl: 'partials/customers.html',
        controller: 'AddCustomerCtrl'
    })

    // Edit Customer
    .when('/customer/:id', {
        templateUrl: 'partials/customers.html',
        controller: 'EditCustomerCtrl'
    })

    // Delete Customer
    .when('/customer/delete/:id', {
        templateUrl: 'partials/customers.html',
        controller: 'DeleteCustomerCtrl'
    })

    // View Customers
    .when('/viewcustomers', {
        templateUrl: 'partials/listCustomers.html',
        controller: 'GetCustomersCtrl'
    })

    //
    // IN ORDERS
    //

    // Add In order
    .when('/addinorder', {
        templateUrl: 'partials/inOrders.html',
        controller: 'AddInOrderCtrl'
    })

    // Edit In Order
    .when('/inorder/:id', {
        templateUrl: 'partials/inOrders.html',
        controller: 'EditInOrderCtrl'
    })

    // Delete In Order
    .when('/inorder/delete/:id', {
        templateUrl: 'partials/inOrders.html',
        controller: 'DeleteInOrderCtrl'
    })

    // View In Orders
    .when('/viewinorders', {
        templateUrl: 'partials/listInOrders.html',
        controller: 'GetInOrderCtrl'
    })

    // View details of In Order
    .when('/inorder/detail/:id', {
        templateUrl: 'partials/inOrders.html'
    })

    // // Add Out Order
    // .when('/addoutorder', {
    //     templateUrl: 'partials/addOutOrder.html'
    // })

    // // View Out Orders
    // .when('/viewoutorders', {
    //     templateUrl: 'partials/viewOutOrders.html'
    // })


    //
    // DEFAULT REDIRECTION
    //
    .otherwise({
        redirectTo: '/underconstruction'
    });

    $locationProvider.html5Mode({
        enabled: true
    });

}]);
