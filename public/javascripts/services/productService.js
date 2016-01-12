angular.module('productService', [])

// each function returns a promise object
.factory('productFactory', ['$http', function($http) {
    var productFactory = {};

    productFactory.create = function(product) {
        console.log('product : ', product);
        return $http.post('/api/product', product);
    }

    return productFactory;

}]);
