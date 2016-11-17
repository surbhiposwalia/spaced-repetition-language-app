import angular from 'angular';

angular.module('myApp')
    .controller('MainCtrl',['$scope','$resource','$window', '$http','$location', function($scope, $resource, $window, $http, $location){
     
        var getUser = function() {
            if($window.location.search != ""){
                $scope.userInfo = $window.location.search;
                var newArr = $scope.userInfo.split('&');
                $scope.accessToken = newArr[0].slice(newArr[0].indexOf('=')+1);
                $scope.currentUserId = newArr[1].slice(newArr[1].indexOf('=')+1);
                $scope.currentUserName = newArr[2].slice(newArr[2].indexOf('=')+1);
                $scope.isAuthenticated = true;
            }
        }
        $scope.getUser = getUser();
        
        var logout = function(){
            $scope.accessToken = "";
            $scope.currentUserId = "";
            $scope.currentUserName = "";
            $scope.isAuthenticated = false;
        }
        $scope.logout = logout;

        $scope.result = '';
        $scope.currentQuestionId  = '';
        $scope.currentQuestion= '';
        $scope.currentAnswer = '';
        
        $scope.initialize = function() {
           
            getQuestionObject();
        }
        
        var getQuestionObject = function(){
            $scope.startQuiz = true;
            console.log($scope.accessToken);
           $http.get('question/'+$scope.currentUserId+'?access_token='+$scope.accessToken)
                .then(function(response){
                    $scope.startQuiz = true;
                    console.log(response.data);
                    var currentQuestionObject = response.data;
                    $scope.result = currentQuestionObject.result;
                    $scope.currentQuestionId = currentQuestionObject.questionObject._id;
                    $scope.currentQuestion = currentQuestionObject.questionObject.question;
                    $scope.currentAnswer = currentQuestionObject.questionObject.answer;
                    $location.path('/quiz');
                });
                console.log($scope.currentQuestionId); 
        };
        
        $scope.getQuestionObject = getQuestionObject;
       
        
        
        var checkAnswer = function(userInputAnswer){
            if($scope.currentQuestionId === userInputAnswer){
                $scope.answerFlag = false;
            }
            else { $scope.answerFlag = true; }
        }
    }]);
