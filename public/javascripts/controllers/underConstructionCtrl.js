var underConstructionModule = angular.module('underConstructionCtrl', []);

underConstructionModule.controller('UnderConstructionCtrl', function($scope) {
    console.log('..UnderConstructionCtrl');
    $scope.message = 'The page you are trying to access is currently under-construction.';
});
