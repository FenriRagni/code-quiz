var question = document.querySelector("h1");
var answers = document.createElement("ol");
var ans1 = document.createElement("li");
var ans2 = document.createElement("li");
var ans3 = document.createElement("li");    //declaration of elements that are being
var ans4 = document.createElement("li");    //created and manipulated
var btn = document.createElement("button");
var main = document.querySelector("main");
var header = document.querySelector("header");
var yourScore = document.createElement("p");
var highScoreDisplay = document.querySelector("#highScore");
var highScoreEntry = JSON.parse(localStorage.getItem("hiScore"));
var timerText = document.querySelector("#timer");
var currentQuestion;
var totalQuestions;
var random;
var timeRemaining;
var setQuestions = { //object with each question, the answer, and which answer is correct in the array
    q: ["Which of the following is NOT a semantic element?",
        "Which of the following is NOT a class selector?",
        "Which of the following is necessary to link a Javascript file with your html file?",
        "Which of the following sets <p> to say 'Hello'",
        "What function is used to repeat something after a certain amount of time?",
        "The correct answer is 'a'"],
    a: [["main", "header", "div", "section"],
        [".box", "#light", ".fans", ".dark"],
        ["src", "href", "ref", "a"],
        ["p.textContent('Hello')", "p.setAttribute('Hello')", "p = texContent('Hello')", "p.textContent = 'Hello'"],
        ["for()", "setInterval()", "setTimeout()", "wait()"],
        ["a", "b", "c","d"]],
    correct: [2, 1, 0, 3, 1, 0]
}

var setQuestions = setQuestions;
console.log(setQuestions);
console.log(setQuestions);

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
    totalQuestions = setQuestions.a.length;
    console.log(totalQuestions);
    main.removeChild(btn);
    if(question.childElementCount > 1){
        question.removeChild(yourScore);
    }
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
    if(currentQuestion === totalQuestions-1) { 
        endGame();
        return;
    }
    else{
    console.log(totalQuestions);
    random = Math.floor(Math.random() * setQuestions.q.length);
    console.log(random);
    question.textContent = setQuestions.q[random];
    question.appendChild(answers);
    ans1.textContent = setQuestions.a[random][0];
    ans2.textContent = setQuestions.a[random][1];
    ans3.textContent = setQuestions.a[random][2];
    ans4.textContent = setQuestions.a[random][3];
    }
}

//updates the timer
function updateTimer() {
    if(timerText.getAttribute("class") === "tik"){
        timerText.setAttribute("class", "tok");
    }
    else {
        timerText.setAttribute("class", "tik");
    }
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
    yourScore.textContent = "Your Score: " + timeRemaining;
    timerText.textContent = "Timer:";
    question.appendChild(yourScore);
    timerText.setAttribute("class", "tik");
    main.appendChild(btn);
    localStorage.setItem("hiScore", JSON.stringify(highScoreEntry));
    header.appendChild(highScoreDisplay);
    offScore();
    setQuestions = { //object with each question, the answer, and which answer is correct in the array
        q: ["Which of the following is NOT a semantic element?",
            "Which of the following is NOT a class selector?",
            "Which of the following is necessary to link a Javascript file with your html file?",
            "Which of the following sets <p> to say 'Hello'",
            "What function is used to repeat something after a certain amount of time?",
            "The correct answer is 'a'"],
        a: [["main", "header", "div", "section"],
            [".box", "#light", ".fans", ".dark"],
            ["src", "href", "ref", "a"],
            ["p.textContent('Hello')", "p.setAttribute('Hello')", "p = texContent('Hello')", "p.textContent = 'Hello'"],
            ["for()", "setInterval()", "setTimeout()", "wait()"],
            ["a", "b", "c","d"]],
        correct: [2, 1, 0, 3, 1, 0]
    }
}

//checks if the user selected the correct answer
//if user answered wrong, we take away 5 seconds from timer and update
function checkAnswer(event){
    if(event.target.textContent === setQuestions.a[random][setQuestions.correct[random]]){
    }
    else{
        timeRemaining = timeRemaining - 5;
        updateTimer();
    }
    currentQuestion++;
    console.log(setQuestions);
    console.log(setQuestions);
    setQuestions.a.splice(random,1);
    setQuestions.q.splice(random,1);
    setQuestions.correct.splice(random,1);
    showQuestion();
}

function sortScores(){
    console.log(highScoreEntry);
    console.log(highScoreEntry.score.length);
    console.log(highScoreEntry.score[0]);
    console.log(highScoreEntry.name[0]);
    for(var i = 0; i < highScoreEntry.score.length;i++){
        for(var x = 0; x < highScoreEntry.score.length; x++){
            if(highScoreEntry.score[x] < highScoreEntry.score[i]){
                [highScoreEntry.score[x],highScoreEntry.score[i]] = [highScoreEntry.score[i],highScoreEntry.score[x]];
                [highScoreEntry.name[x],highScoreEntry.name[i]] = [highScoreEntry.name[i],highScoreEntry.name[x]];
            }
        }
    }
}
//swaps whether a high scores list is shown
function swapScore(){ //only adds new elements if there are new scores
    if(highScore.getAttribute("data-state")==="off" && 
        highScoreEntry.name.length > highScoreDisplay.childElementCount){
        highScore.setAttribute("data-state", "on");
        highScore.setAttribute("class","on");
        sortScores();
        for(var x = 0; x < highScoreEntry.name.length; x++){
            tempLi = document.createElement("li");
            if(highScoreEntry.name[x]===null||highScoreEntry.name[x]=== ""){ //if user didn't enter intials set name = NA
                tempLi.textContent = "NA: " + highScoreEntry.score[x];
            }
            else{
            tempLi.textContent = highScoreEntry.name[x] + ": " + highScoreEntry.score[x];
            }
            highScoreDisplay.appendChild(tempLi);
        }

    }
    else {
        offScore();
    }
}

function offScore(){
    highScore.setAttribute("data-state","off");
        highScore.setAttribute("class","off");
        var numScores = highScoreDisplay.childElementCount;
        for(var x = 0; x < numScores; x++){
        highScoreDisplay.removeChild(highScoreDisplay.lastChild);
        }
}

//different event "click" listeners
highScore.addEventListener("click", swapScore);
ans1.addEventListener("click",checkAnswer);
ans2.addEventListener("click",checkAnswer);
ans3.addEventListener("click",checkAnswer);
ans4.addEventListener("click",checkAnswer);
btn.addEventListener("click",startGame);