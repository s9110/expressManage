var productService = angular.module('productService', ['ngResource']);

// each function returns a promise object
productService.factory('productFactory', ['$http', '$resource',
    function($http, $resource) {
        var productFactory = {};

        productFactory.get = function() {
            return $http.get('/api/product');
        }

        productFactory.create = function(product) {
            return $http.post('/api/product', product);
        }

        productFactory.update = function() {
            return $resource('/api/product/:id', {
                id: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }

        productFactory.delete = function() {
            return $resource('/api/product/:id');
        }

        return productFactory;

    }
]);
