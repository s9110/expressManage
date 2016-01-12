angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

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

    // default redirection
    .otherwise({
        redirectTo: '/underconstruction'
    });

    $locationProvider.html5Mode({
        enabled: true
    });

}]);
