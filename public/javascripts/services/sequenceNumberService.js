var sequenceNumberService = angular.module('sequenceNumberService', ['ngResource']);

// Each function returns a promise object
sequenceNumberService.factory('sequenceNumberFactory', ['$http', '$resource',
    function($http, $resource) {
        var sequenceNumberFactory = {};

        sequenceNumberFactory.get = function() {
            return $http.get('/api/sequencenum');
        }

        sequenceNumberFactory.create = function(sequenceNum) {
            return $http.post('/api/sequencenum', sequenceNum);
        }

        // sequenceNumberFactory.find = function() {
        //     return $http.post('/api/sequencenum', sequencenum);
        // }

        return sequenceNumberFactory;
    }
]);
