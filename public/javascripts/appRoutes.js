angular.module('appRoutes', ['productModule'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
        templateUrl: 'partials/dashboard.html',
        controller: 'ExpressManageInitCtrl'
    })

    // Under-Construction
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
        templateUrl: 'partials/viewCustomers.html',
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

    // // View In Orders
    // .when('/viewinorders', {
    //     templateUrl: 'partials/viewInOrders.html'
    // })

    // // Add Out Order
    // .when('/addoutorder', {
    //     templateUrl: 'partials/addOutOrder.html'
    // })

    // // View Out Orders
    // .when('/viewoutorders', {
    //     templateUrl: 'partials/viewOutOrders.html'
    // })


    // default redirection
    .otherwise({
        redirectTo: '/underconstruction'
    });

    $locationProvider.html5Mode({
        enabled: true
    });

}]);
