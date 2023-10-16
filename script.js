var startBtn = document.getElementById("startBtn")
var submitBtn = document.getElementById("button");
var highScores = document.getElementsByClassName("highscores");
var timer = document.getElementById("timer");
var intervalId
var currentIndex = 0


var questions = [
    {
        question: "When was JavaScript created?",
        answers: ["1993", "2023", "1996", "2012"],
        correctAnswer: "1993"


    },
    {
        question: "Commonly used data types Do Not Iclude:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"

    },
    {
        question: "The condition in an if/else state is enclosed with what?",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAnswer: "parenthesis"
    },
]

function startQuiz() {
    intervalId = setInterval(startTimer, 1000);
    console.log("Quiz Started!");
    document.querySelector(".quiz-header").style.display = "none";
    document.querySelector(".questions-display").style.display = "block";
    displayQuiz();
}

function displayQuiz() {
    var quiz = questions[currentIndex]
    var content = `
    <h2>${quiz.question}</h2>
                    <ul id="answers">
                        ${quiz.answers.map((answer, i) => `<li><button>${i + 1}. ${answer}</button></li>`).join('')}
                    </ul>`
    document.querySelector(".questions-display").innerHTML = content
    addAnswerClickEvents()
}


function addAnswerClickEvents() {
    var answers = document.querySelector('#answers');
    answers.addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            var selectedAnswer = event.target.textContent.split(' ')[1];
            var correctAnswer = questions[currentIndex].correctAnswer;
            var feedback = document.createElement("p");

            if (correctAnswer === selectedAnswer) {
                feedback.textContent = "Correct!";
                feedback.classList.add("correct");
            } else {
                feedback.textContent = "Wrong!";
                feedback.classList.add("wrong");
            }

            answers.innerHTML = "";
            answers.appendChild(feedback);

            currentIndex++;
            if (currentIndex < questions.length) {
                setTimeout(function () {
                    displayQuiz();
                }, 1000);
            } else {
                setTimeout(function () {
                    displayFinishScreen();
                }, 1000);
            }
        }
    });
}

function displayFinishScreen(score, submitBtn) {
    var finishScreen = document.querySelector(".finish-screen");
    var initialsInput = finishScreen.querySelector("input[type='text']");
    finishScreen.style.display = "block";


    submitBtn.addEventListener("click", function (submit) {
        var initials = initialsInput.value;
        console.log("Initials: " + initials);
    });
}



var countDown = 10
function startTimer() {
    timer.textContent = "Timer: " + countDown
    countDown--;


    if (countDown <= -1) {
        clearInterval(intervalId);
        // displayMessage()
    }
}

startBtn.addEventListener("click", startQuiz);


/*/Add functionality to handle user answers and check if they are correct or incorrect.

Implement logic to move to the next question after the user answers.

Update the timer to reflect the remaining time for each question.

Add a function to end the quiz when all questions have been answered or the timer reaches 0.

Implement a scoring system to calculate and display the user's score.

Add a form to capture the user's initials and save their score.

Style the quiz interface to make it more visually appealing./*/