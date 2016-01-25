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

    // Add Product
    .when('/addproduct', {
        templateUrl: 'partials/addProduct.html',
        controller: 'AddProductCtrl'
    })

    // View Products
    .when('/viewproducts', {
        templateUrl: 'partials/viewProducts.html',
        controller: 'GetProductsCtrl'
    })

    // Edit Product
    .when('/product/:id', {
        templateUrl: 'partials/addProduct.html',

        controller: 'EditProductCtrl'
    })

    // Delete Product
    .when('/product/delete/:id', {
        templateUrl: 'partials/deleteProduct.html',
        controller: 'DeleteProductCtrl'
    })

    // Add Customer
    .when('/addcustomer', {
        templateUrl: 'partials/addCustomer.html',
        controller: 'SaveCustomerCtrl'
    })

    // View Customers
    .when('/viewcustomers', {
        templateUrl: 'partials/viewCustomers.html',
        controller: 'GetCustomersCtrl'
    })

    // Edit Customer
    .when('/customer/:id', {
        templateUrl: 'partials/addCustomer.html',
        controller: 'EditCustomerCtrl'
    })

    // Delete Customer
    .when('/customer/delete/:id', {
        templateUrl: 'partials/deleteCustomer.html',
        controller: 'DeleteCustomerCtrl'
    })

    // Add In order
    .when('/addinorder', {
        templateUrl: 'partials/addInOrder.html'
    })

    // View In Orders
    .when('/viewinorders', {
        templateUrl: 'partials/viewInOrders.html'
    })

    // Add Out Order
    .when('/addoutorder', {
        templateUrl: 'partials/addOutOrder.html'
    })

    // View Out Orders
    .when('/viewoutorders', {
        templateUrl: 'partials/viewOutOrders.html'
    })


    // default redirection
    .otherwise({
        redirectTo: '/underconstruction'
    });

    $locationProvider.html5Mode({
        enabled: true
    });

}]);
