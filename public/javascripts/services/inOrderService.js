var inOrderService = angular.module('inOrderService', ['ngResource']);

// Each function returns a promise object
inOrderService.factory('inOrderFactory', ['$http', '$resource',
    function($http, $resource) {
        var inOrderFactory = {};

        inOrderFactory.get = function() {
            return $http.get('/api/inorder');
        }

        inOrderFactory.create = function(inOrder) {
            return $http.post('/api/inorder', inOrder);
        }

        inOrderFactory.update = function() {
            return $resource('/api/inorder/:id', {
                id: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }

        inOrderFactory.delete = function() {
            return $resource('/api/inorder/:id');
        }

        return inOrderFactory;

    }
]);
