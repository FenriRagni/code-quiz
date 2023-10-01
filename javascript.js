var question = document.querySelector("h1");
var answers = document.createElement("ol");
var ans1 = document.createElement("li");
var ans2 = document.createElement("li");
var ans3 = document.createElement("li");    //declaration of elements that are being
var ans4 = document.createElement("li");    //created and manipulated
var btn = document.createElement("button");
var main = document.querySelector("main");
var header = document.querySelector("header");
var highScoreDisplay = document.querySelector("#highScore");
var highScoreEntry = JSON.parse(localStorage.getItem("hiScore"));
var timerText = document.querySelector("#timer");
var currentQuestion;
var timeRemaining;
var questions = { //object with each question, the answer, and which answer is correct in the array
    q: ["Which of the following is NOT a semantic element?",
        "Which of the following is NOT a class selector?",
        "Which of the following is necessary to link a Javascript file with your html file?",
        "Which of the following sets <p> to say 'Hello'",
        "What was the answer to question 1?",
        "The correct answer is 'a'"],
    a: [["main", "header", "div", "section"],
        [".box", "#light", ".fans", ".dark"],
        ["src", "href", "ref", "a"],
        ["p.textContent('Hello')", "p.setAttribute('Hello')", "p = texContent('Hello')", "p.textContent = 'Hello'"],
        ["#light", "div", "src", "main"],
        ["a", "b", "c","d"]],
    correct: [2, 1, 0, 3, 1, 0]
}

//checks to see there were scores already saved in local storage
//if not, set the entry to empty arrays
if(highScoreEntry === null) {
    highScoreEntry = {
        name: [],
        score: []
    }
}

//assigns our listed items to our ordered list that will display our answers
answers.appendChild(ans1);
answers.appendChild(ans2);
answers.appendChild(ans3);
answers.appendChild(ans4);
main.appendChild(btn); //adds our created button to the main element
btn.textContent = "Start Quiz";

//sets the initial state once the user wants to start the game
//sets our timer, current question
//also removes visuals that aren't necessary during quiz
function startGame() {
    timeRemaining = 50;
    currentQuestion = 0;
    main.removeChild(btn);
    header.removeChild(highScoreDisplay);
    showQuestion();
    updateTimer();
    timer = setInterval(function() {
        if(timeRemaining<=0){
            endGame();
        }
        else{
            timeRemaining--;
            updateTimer();
        }
    },1000)
}


//updates what question and answers are currently being shown
function showQuestion() {
    //checks if final question has been shown
    //ends the game if true
    if(currentQuestion === questions.q.length) { 
        endGame();
        return;
    }
    else{
    question.textContent = questions.q[currentQuestion];
    question.appendChild(answers);
    ans1.textContent = questions.a[currentQuestion][0];
    ans2.textContent = questions.a[currentQuestion][1];
    ans3.textContent = questions.a[currentQuestion][2];
    ans4.textContent = questions.a[currentQuestion][3];
    }
}

//updates the timer
function updateTimer() {
    timerText.textContent = "Timer: " + timeRemaining;
}

//prompts user for intials input then saves initials and score to localStorage
//also sets quiz ready to be taken again if desired
function endGame(){
    var initials = prompt("Please enter your initials!");
    clearInterval(timer);
    highScoreEntry.name.push(initials);
    highScoreEntry.score.push(timeRemaining);
    question.removeChild(answers);
    question.textContent = "Want to try again?";
    main.appendChild(btn);
    localStorage.setItem("hiScore", JSON.stringify(highScoreEntry));
    header.appendChild(highScoreDisplay);
}

//checks if the user selected the correct answer
//if user answered wrong, we take away 5 seconds from timer and update
function checkAnswer(event){
    if(event.target.textContent === questions.a[currentQuestion][questions.correct[currentQuestion]]){
    }
    else{
        timeRemaining = timeRemaining - 5;
        updateTimer();
    }
    currentQuestion++;
    showQuestion();
}

//swaps whether a high scores list is shown
function swapScore(){ //only adds new elements if there are new scores
    if(highScore.getAttribute("data-state")==="off" && 
        highScoreEntry.name.length > highScoreDisplay.childElementCount){
        highScore.setAttribute("data-state", "on");
        highScore.setAttribute("class","on");
        for(var x = 0; x < highScoreEntry.name.length; x++){
            tempLi = document.createElement("li");
            if(highScoreEntry.name[x]===null){ //if user didn't enter intials set name = NA
                tempLi.textContent = "NA: " + highScoreEntry.score[x];
            }
            else{
            tempLi.textContent = highScoreEntry.name[x] + ": " + highScoreEntry.score[x];
            }
            highScoreDisplay.appendChild(tempLi);
        }

    }
    else {
        highScore.setAttribute("data-state","off");
        highScore.setAttribute("class","off");
        var numScores = highScoreDisplay.childElementCount;
        for(var x = 0; x < numScores; x++){
        highScoreDisplay.removeChild(highScoreDisplay.lastChild);
        }
    }
}

//different event "click" listeners
highScore.addEventListener("click", swapScore);
ans1.addEventListener("click",checkAnswer);
ans2.addEventListener("click",checkAnswer);
ans3.addEventListener("click",checkAnswer);
ans4.addEventListener("click",checkAnswer);
btn.addEventListener("click",startGame);