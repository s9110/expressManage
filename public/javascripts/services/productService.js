var productService = angular.module('productService', []);

// services.factory('User', function($resource) {
//     return $resource('/rest/usersettings/:username', {}, {
//         get: {
//             method: 'GET'
//         },
//         update: {
//             method: 'POST'
//         }
//     });
// });


// each function returns a promise object
productService.factory('productFactory', ['$http',
    function($http) {
        var productFactory = {};

        productFactory.get = function() {
            return $http.get('/api/product');
        }

        productFactory.create = function(product) {
            return $http.post('/api/product', product);
        }

        productFactory.getOne = function(id) {
            return $http.get('/api/product/:id', id);
        }

        // productFactory.update = function(id) {
        //     return $resource('/api/product/:id', {
        //         id: '@_id'
        //     }, {
        //         update: {
        //             method: 'PUT'
        //         }
        //     });
        // }


        // var ProductsResource = $resource('/api/product/:id', {
        //     id: '@_id'
        // }, {
        //     update: {
        //         method: 'PUT'
        //     }
        // });


        // services.factory('User', function($resource) {
        //     return $resource('/rest/usersettings/:username', {}, {
        //         get: {
        //             method: 'GET'
        //         },
        //         update: {
        //             method: 'POST'
        //         }
        //     });
        // });

        return productFactory;

    }
]);
