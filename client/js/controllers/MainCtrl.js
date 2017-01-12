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
            $scope.startQuiz = false;
        }
        $scope.logout = logout;
        $scope.result = '';
        $scope.currentQuestionId  = '';
        $scope.currentQuestion= '';
        $scope.currentAnswer = '';
        $scope.initialize = function() {
           $scope.startQuiz = true;
            getQuestionObject();
        }
        
        var getQuestionObject = function(){
            $http.get('question/'+$scope.currentUserId+'?access_token='+$scope.accessToken)
                .then(function(response){
                    $scope.startQuiz = true;
                    $scope.showResult = false;
                    var currentQuestionObject = response.data;
                    $scope.result = currentQuestionObject.result;
                    $scope.currentQuestionId = currentQuestionObject.questionObject._id;
                    $scope.currentQuestion = currentQuestionObject.questionObject.question;
                    $scope.currentAnswer = currentQuestionObject.questionObject.answer;
                });
        };
        $scope.getQuestionObject = getQuestionObject;
        $scope.userInputAnswer;
        var checkAnswer = function(userInputAnswer){
            $scope.showResult = true;
            if($scope.currentAnswer.toLowerCase() == userInputAnswer.toLowerCase()){
                $scope.answerFlag = true;
                $scope.answerStatus = 'correct';
            }
            else {
                $scope.answerFlag = false;
                $scope.answerStatus = 'incorrect';
            }
        }
        $scope.checkAnswer = checkAnswer;
        
        var nextQuestionGenerator = function(){
            var request = {
                 method: 'POST',
                 url: 'app/v1/question/?access_token='+$scope.accessToken,
                 headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                 },
                 data: JSON.stringify({
                           currentUserId: $scope.currentUserId,
                           answerFlag: $scope.answerStatus
                       })
                }
                
                $http(request)
                    .then(function(response){
                        $scope.startQuiz = true;
                        $scope.showResult = false;
                        var currentQuestionObject = response.data;
                        $scope.result = currentQuestionObject.result;
                        $scope.currentQuestionId = currentQuestionObject.questionObject._id;
                        $scope.currentQuestion = currentQuestionObject.questionObject.question;
                        $scope.currentAnswer = currentQuestionObject.questionObject.answer;      
                    }
                );
        }
        $scope.nextQuestionGenerator = nextQuestionGenerator;
    }])
    
.directive('quiz', function() {
  return {
    templateUrl: '/assets/templates/quiz.html'
  };
});