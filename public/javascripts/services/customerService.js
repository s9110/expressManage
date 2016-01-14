angular.module('customerService', [])

// each function returns a promise object
.factory('customerFactory', ['$http', function($http) {
    var customerFactory = {};

    customerFactory.get = function() {
        return $http.get('/api/customer');
    }

    customerFactory.create = function(customer) {
        return $http.post('/api/customer', customer);
    }

    return customerFactory;

}]);
