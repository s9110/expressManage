var expressManageModule = angular.module('expressManageCtrl', []);

expressManageModule.controller('ExpressManageCtrl', function($scope) {
    console.log('..ExpressManageCtrl');
    $scope.tagLine = 'From expressManageController!';
});
