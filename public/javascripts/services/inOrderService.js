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

        return inOrderFactory;

    }
]);
