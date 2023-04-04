var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var generateBtn = document.querySelector("#generate");
var answers = ["Red", "42", "19"];
var timeLeft;
var score;
var currentQuestion = 0;
var timeInterval = null;
function startTimer() {
    timeLeft = 20;
    score = 0;
    var lbDisplay = document.getElementById("lbDisplay");
    lbDisplay.classList.add("hidden");
    timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1) { 
            timerEl.textContent = '1 Second left';
            timeLeft--;
        } else {
            timerEl.textContent = 'No time left';
            hideQuestion(currentQuestion);
            finishQuiz();
            
        }

    }, 1000);
    generateBtn.classList.add("hidden");
    showQuestion(1);
}
generateBtn.addEventListener("click", startTimer)

function showQuestion(questionid) {
    var questions = document.getElementById('question' + questionid);
    questions.classList.remove("hidden");
    currentQuestion = questionid;
}

function hideQuestion(questionid) {
    if (currentQuestion > 0) {
        var questions = document.getElementById('question' + questionid);
        questions.classList.add("hidden");
    }
    currentQuestion = 0;
}


function onQuestionAnswer(questionid, answerid) {
    var correctanswer = answers[questionid - 1];
    if (answerid == correctanswer) {
        score++;
    } else {
        timeLeft = timeLeft - 5;
    }

    hideQuestion(questionid);
    if (questionid >= answers.length) {
        finishQuiz();
        return;
    }
    showQuestion(questionid + 1);

}

function finishQuiz() {
    if (timeInterval != null) {
        clearInterval(timeInterval);
        timeInterval = null;
    }
    var nameinput = document.getElementById('nameinput');
    nameinput.classList.remove("hidden");
}

function addToLeaderboard() {
    var input = document.getElementById("name");
    var name = input.value;
    var leaderboard = localStorage.getItem("leaderboard");
    if (!leaderboard) {
        leaderboard = name + " Score: " + score;
    } else {
        leaderboard += ", " + name + " Score: " + score;
    }    
    localStorage.setItem("leaderboard", leaderboard);
    var lbDisplay = document.getElementById("lbDisplay");
    lbDisplay.textContent = leaderboard;
    lbDisplay.classList.remove("hidden");
    generateBtn.classList.remove("hidden");
    var nameinput = document.getElementById('nameinput');
    nameinput.classList.add("hidden");
}