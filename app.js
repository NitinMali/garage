//Initialising angular app
var garage = angular.module('garage', ['ui.router']);

//Route setting
garage.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                views: {
                    '': {
                        controller: 'garageCtrl',
                        templateUrl: 'views/garage.html'
                    },
                    'filter' : {
                        controller: 'filterCtrl',
                        templateUrl: 'views/filter.html'
                    }
                }
            })
            .state('vehicle', {
                url: '/vehicle/:vehicleId?',
                controller: 'vehicleCtrl',
                templateUrl: 'views/vehicle.html'
            });
});