import angular from 'angular';
angular.module('myApp', [require('angular-route'), 'ngResource'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: '/assets/templates/main.html',
                controller: 'MainCtrl'
            })
            // .when('/quiz', {
            //     templateUrl: '/assets/templates/quiz.html',
            //     controller: 'MainCtrl'
            // });
        
    }]);
