function sortQuestion (questionOrder, answerFlag) {
    var firstQuestionObject = questionOrder.shift();
    
    if(questionOrder.length-1 === 0) {
                window.location("https://french-xxx.herokuapp.com/");
        }
        
    if (answerFlag === 'correct' ) {
        firstQuestionObject.weight *= 2;
        
        if(firstQuestionObject.weight >= 8) {
            return questionOrder;
    }
    } else if (answerFlag === 'incorrect') {
        firstQuestionObject.weight = 1;
    }
    
     if (questionOrder.length-1 <= firstQuestionObject.weight) {
         questionOrder.push(firstQuestionObject);
         return questionOrder;
    }
     questionOrder.splice(firstQuestionObject.weight, 0, firstQuestionObject);
     return questionOrder;
    
}

module.exports = sortQuestion;