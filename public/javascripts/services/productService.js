angular.module('productService', [])

// each function returns a promise object
.factory('productFactory', ['$http', function($http) {
    var productFactory = {};

    productFactory.create = function(product) {
        console.log('product : ', product);
        return $http.get('/api/product', product);
    }

    return productFactory;

}]
);


// angular.module('todoService', [])
//
// 	// super simple service
// 	// each function returns a promise object
// 	.factory('Todos', ['$http',function($http) {
// 		return {
// 			get : function() {
// 				return $http.get('/api/todos');
// 			},
// 			create : function(todoData) {
// 				return $http.post('/api/todos', todoData);
// 			},
// 			delete : function(id) {
// 				return $http.delete('/api/todos/' + id);
// 			}
// 		}
// 	}]);
