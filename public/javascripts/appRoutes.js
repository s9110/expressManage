angular.module('appRoutes', ['productModule'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
        templateUrl: 'partials/dashboard.html',
        controller: 'ExpressManageController'
    })

    // Under-Construction
    .when('/underconstruction', {
        templateUrl: 'partials/underConstruction.html',
        controller: 'underConstructionController'
    })

    // Add Product
    .when('/addproduct', {
        templateUrl: 'partials/addProduct.html',
        controller: 'productController'
    })

    // View Products
    .when('/viewproducts', {
        templateUrl: 'partials/viewProducts.html',
        controller: 'productController'
    })

    // Add Customer
    .when('/addcustomer', {
        templateUrl: 'partials/addCustomer.html',
        controller: 'customerController'
    })

    // View Customers
    .when('/viewcustomers', {
        templateUrl: 'partials/viewCustomers.html',
        controller: 'customerController'
    })

    // default redirection
    .otherwise({
        redirectTo: '/underconstruction'
    });

    $locationProvider.html5Mode({
        enabled: true
    });

}]);
