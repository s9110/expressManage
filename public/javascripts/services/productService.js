angular.module('productService', [])

// each function returns a promise object
.factory('productFactory', ['$http', function($http) {
    var productFactory = {};

    productFactory.get = function () {
        return $http.get('/api/product');
    }

    productFactory.create = function(product) {
        return $http.post('/api/product', product);
    }

    return productFactory;

}]);
