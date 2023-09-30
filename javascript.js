var question = document.querySelector("h1");
var answers = document.createElement("ol");
var ans1 = document.createElement("li");
var ans2 = document.createElement("li");
var ans3 = document.createElement("li");
var ans4 = document.createElement("li");
var btn = document.createElement("button");
var main = document.querySelector("main");
var timeRemaining;
var timer;
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
answers.appendChild(ans1);
answers.appendChild(ans2);
answers.appendChild(ans3);
answers.appendChild(ans4);
main.appendChild(btn);
btn.textContent = "Start Quiz";

function startGame() {
    timeRemaining = 50;
    currentQuestion = 0;
    showQuestion();
}

function showQuestion() {
    if(currentQuestion === questions.q.length) {
        endGame();
        return;
    }
    question.textContent = questions.q[currentQuestion];
    main.removeChild(btn);
    question.appendChild(answers);
    ans1.textContent = questions.a[currentQuestion][0];
    ans2.textContent = questions.a[currentQuestion][1];
    ans3.textContent = questions.a[currentQuestion][2];
    ans4.textContent = questions.a[currentQuestion][3];
}

function updateTimer() {
    
}

btn.addEventListener("click", startGame);
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