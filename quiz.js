function inheritPrototype(childObject, parentObject) {
    var copyOfParent = Object.create(parentObject.prototype);

    copyOfParent.constructor = childObject;
    childObject.prototype = copyOfParent;
}

function User(theName, theEmail) {
    this.name = theName;
    this.email = theEmail;
    this.quizScores = [];
    this.currentScore = 0;
}

User.prototype = {
    constructor: User,
    saveScores: function(theScoreToAdd) {
        this.quizScores.push(theScoreToAdd);
    },
    showNameAndScores: function() {
        var scores = this.quizScores.length > 0 ? this.quizScores.join(","): "No score yet!";
        return this.name + "Scores: " + scores;
    },
    changeEmail: function(newEmail) {
        this.email = newEmail;
        return "New Email saved: " + this.email;

    }

}

firstUser = new User('Bright', 'menezy10@gmail.com');
console.log(firstUser.changeEmail('menezy25@gmail.com'));
firstUser.saveScores(15);
firstUser.saveScores(25);
console.log(firstUser.showNameAndScores());

secondUser = new User('Magdalene', 'magdalene@gmail.com');
secondUser.saveScores(30);
secondUser.saveScores(12);
console.log(secondUser.showNameAndScores());

function Question(theQuestion, theChoices, theCorrectAnswer) {
    this.question = theQuestion;
    this.choices = theChoices;
    this.correctAnswer = theCorrectAnswer;
    this.userAnswer = "";


    var newDate = new Date();


    QUIZ_CREATED_DATE = newDate.toLocaleDateString();

    this.getQuizDate = function(){
        return QUIZ_CREATED_DATE;
    };
        console.log("Quiz created on: " + this.getQuizDate());
}


Question.prototype.getCorrectAnswer = function(){
    return this.correctAnswer;
}

Question.prototype.getUserAnswer = function() {
    return  this.userAnswer;
}

Question.prototype.displayQuestion = function() {
    var questionToDisplay = "<div class='question'>" + this.question + "</div> <ul>";
    choiceCounter = 0;

    this.choices.forEach(function(eachChoice){
        questionToDisplay += '<li><input type="radio" name="choice" value="'+ choiceCounter +'">' + eachChoice + '</li>';
        choiceCounter++;

    })
    questionToDisplay += '</ul>';

    document.getElementById('quiz').innerHTML = questionToDisplay;
};

function multipleChoiceQuestion(theQuestion, theChoices, theCorrectAnswer){
    Question.call(this, theQuestion, theChoices, theCorrectAnswer);
    };

    inheritPrototype(multipleChoiceQuestion, Question);


function dragAndDropQuestion(theQuestion, theChoices, theCorrectAnswer){
    Question.call(this, theQuestion, theChoices,theCorrectAnswer);
}

inheritPrototype(dragAndDropQuestion, Question);

dragAndDropQuestion.prototype.displayQuestion = function(){
    console.log(this.question);
};

var allQuestions = [
    new multipleChoiceQuestion('Who is the Prime Minister of England?', ['Obama','Blair','Brown','Cameron'], 3),
    new multipleChoiceQuestion('What is the capital of Nigeria?', ['Lagos','Calabar','Abuja','Port-Harcourt'], 2),
    new dragAndDropQuestion('Drag the correct city to the world map', ['Washington DC','London','Paris','Lagos'],3)
];

allQuestions.forEach(function (eachQuestion)  {
    eachQuestion.displayQuestion();
});