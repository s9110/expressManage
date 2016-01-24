angular.module('customerService', [])

// each function returns a promise object
.factory('customerFactory', ['$http', '$resource',
    function($http, $resource) {
        var customerFactory = {};

        customerFactory.get = function() {
            return $http.get('/api/customer');
        }

        customerFactory.create = function(customer) {
            return $http.post('/api/customer', customer);
        }

        customerFactory.update = function() {
            return $resource('/api/customer/:id', {
                id: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }

        customerFactory.delete = function() {
            return $resource('/api/customer/:id');
        }

        return customerFactory;

    }
]);
