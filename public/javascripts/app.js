'use strict';

var exppressManageApp = angular.module('manageExpress', [
    'ngRoute',
    'appRoutes',
    'expressManageModule',
    'underConstructionModule',
    'productModule',
    'customerModule',
    'inOrderModule'
]);

// Configure lodash
exppressManageApp.constant('_', window._);
