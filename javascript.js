var question = document.querySelector("h1");
var answers = document.createElement("ol");
var ans1 = document.createElement("li");
var ans2 = document.createElement("li");
var ans3 = document.createElement("li");
var ans4 = document.createElement("li");
var btn = document.createElement("button");
var main = document.querySelector("main");
var header = document.querySelector("header");
var highScoreDisplay = document.querySelector("#highScore");
var timeRemaining;
var timerText = document.querySelector("#timer");
var currentQuestion = 0;
var questions = {
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
var highScoreEntry = JSON.parse(localStorage.getItem("hiScore"));
if(highScoreEntry === null) {
    highScoreEntry = {
        name: [],
        score: []
    }
}

answers.appendChild(ans1);
answers.appendChild(ans2);
answers.appendChild(ans3);
answers.appendChild(ans4);

main.appendChild(btn);
btn.textContent = "Start Quiz";

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

function showQuestion() {
    console.log("currentQuestion: " + currentQuestion);
    console.log("# of questions: " +questions.q.length);
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

function updateTimer() {
    timerText.textContent = "Timer: " + timeRemaining;
}

function endGame(){
    var initials = prompt("Please enter your initials!");
    clearInterval(timer);
    highScoreEntry.name.push(initials);
    highScoreEntry.score.push(timeRemaining);
    question.removeChild(answers);
    question.textContent = "Do you want to play Again?";
    main.appendChild(btn);
    localStorage.setItem("hiScore", JSON.stringify(highScoreEntry));
    header.appendChild(highScoreDisplay);
}

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

function swapScore(){

    if(highScore.getAttribute("data-state")==="off" && 
        highScoreEntry.name.length > highScoreDisplay.childElementCount){
        highScore.setAttribute("data-state", "on");
        highScore.setAttribute("class","on");
        for(var x = 0; x < highScoreEntry.name.length; x++){
            tempLi = document.createElement("li");
            if(highScoreEntry.name[x]===null){
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


highScore.addEventListener("click", swapScore);
ans1.addEventListener("click",checkAnswer);
ans2.addEventListener("click",checkAnswer);
ans3.addEventListener("click",checkAnswer);
ans4.addEventListener("click",checkAnswer);
btn.addEventListener("click",startGame);
//variable declaritions
    //timeRemaining
//querySelectors

//function to start the game
//listen for button start
//start timer in intervals of 1000 ms
//first question displays and corresponding answers
    //carousel-box like array to keep track of what question you are on
//use eventlisteners on buttons check for answers
    //compare clicked button to what we have as correct answer 
    //if wrong display WRONG!!! and decrement an amount of time from timer
    //if correct display CORRECT!!! 
    //in either case move onto next question
    //if end of questions end game
//repeat until timer hits 0 or run out of questions
    //when our array of questions returns undefined or length-1 for index
    //end game
//Display of time remaining as score
//end game
    //stop timer
    //prompt for their initials 
    //save score into high score
    //clear timer