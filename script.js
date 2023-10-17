var startBtn = document.getElementById("startBtn")
var submitBtn = document.getElementById("submitBtn");
var highScores = document.querySelector(".highscores");
var timer = document.getElementById("timer");
var intervalId
var currentIndex = 0
var scores = 0


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
    highScores.style.display = "none";
    intervalId = setInterval(startTimer, 1000);
    console.log("Quiz Started!");
    document.querySelector(".quiz-header").style.display = "none";
    document.querySelector("main").style.display = "block";
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
    var section = document.querySelector(".questions-display");
    answers.addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            var selectedAnswer = event.target.textContent.split(' ')[1];
            var correctAnswer = questions[currentIndex].correctAnswer;
            var feedback = document.createElement("p");
            var hr = document.createElement("hr");

            if (correctAnswer === selectedAnswer) {
                feedback.textContent = "Correct!";
                feedback.classList.add("correct");
                scores += 5
            } else {
                feedback.textContent = "Wrong!";
                feedback.classList.add("wrong");
                scores -= 5
                if (scores < 0) {
                    scores = 0
                }
            }

            //answers.innerHTML = "";
            section.appendChild(hr);
            section.appendChild(feedback);

            currentIndex++;
            if (currentIndex < questions.length) {
                setTimeout(function () {
                    displayQuiz();
                }, 1200);
            } else {
                setTimeout(function () {
                    displayFinishScreen();
                }, 1200);
            }
        }
    });
}

function displayFinishScreen() {
    clearInterval(intervalId);
    document.querySelector(".questions-display").style.display = "none";

    var finishScreen = document.querySelector(".finish-screen");
    var initialsInput = finishScreen.querySelector("input[type='text']");
    finishScreen.style.display = "block";
    document.querySelector("#scores").innerText = scores;


    submitBtn.addEventListener("click", function (submit) {
        var initials = initialsInput.value;
        console.log("Initials: " + initials);
        saveTolocalStorage(initials)
    });
}

function saveTolocalStorage(initials) {
    const savedScores = JSON.parse(localStorage.getItem("scores")) || []
    savedScores.push({ initials, scores })
    localStorage.setItem("scores", JSON.stringify(savedScores))

}

function showHighScores() {
    clearInterval(intervalId)
    highScores.style.display = "block";
    document.querySelector(".questions-display").style.display = "none";
    var finishScreen = document.querySelector(".finish-screen");
    finishScreen.style.display = "none"
    document.querySelector(".quiz-header").style.display = "none";
    const savedScores = JSON.parse(localStorage.getItem("scores")) || []
    savedScores.forEach(s => {
        var li = `<li>${s.initials} - ${s.scores}</li>`
        document.querySelector(".highscores ol").insertAdjacentHTML("beforeend", li)
    });
    document.getElementById("back").addEventListener("click", function (){
        document.querySelector("main").style.display = "none";
        document.querySelector(".quiz-header").style.display = "flex";
    }) 
    
}
document.querySelector("#view-highscores")
.addEventListener("click", showHighScores)

var countDown = 10
function startTimer() {
    countDown--;
    timer.textContent = "Timer: " + countDown

    if (countDown <= 0) {
        displayFinishScreen()
        //clearInterval(intervalId);
        // displayMessage()
    }
}

startBtn.addEventListener("click", startQuiz);


