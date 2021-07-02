const questionnumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const score = document.querySelector(".score-tracking");
const indicator = document.querySelector(".container-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const ResultBox = document.querySelector(".result-box");
const Skipping = document.querySelector(".button-skip");
const Next = document.querySelector(".button-next");


let questioncounter = 0;
let currentquestion;
let availableQuestions = [];
let availableoptions = [];
let correctAnswers = 0;
let skips = 0;


function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}
function setAvailableOptionss() {
    const totalOptions = quiz.options.length;
    for (let i = 0; i < totalOptions; i++) {
        availableoptions.push(quiz[i])
    }
}
function getNewQuestion() {
    questionnumber.innerHTML = "Question" + " " + (questioncounter + 1) + " " + "of" + " " + quiz.length;
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentquestion = questionIndex;
    questionText.innerHTML = currentquestion.question;
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1, 1);
    const optionLen = currentquestion.options.length
    Next.classList.add("hide");
    indicator.classList.add("hide")
    Skipping.classList.remove("hide");
    for (let i = 0; i < optionLen; i++) {
        availableoptions.push(i)
    }
    optionContainer.innerHTML = '';

    for (let i = 0; i < optionLen; i++) {
        const optonIndex = availableoptions[Math.floor(Math.random() * availableoptions.length)];
        const index2 = availableoptions.indexOf(optonIndex);
        availableoptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML = currentquestion.options[optonIndex];
        option.id = optonIndex;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)")
    }
    if (skips == 3){
        Skipping.classList.add("hide")

    }
    questioncounter++
}
function getResult(optonElement) { 
    const id = parseInt(optonElement.id)
    indicator.classList.remove("hide")
    if (id === currentquestion.answer) {
        optonElement.classList.add("correct")
        correctAnswers++;
    }
    else {
        optonElement.classList.add("wrong")
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentquestion.answer) {
                optionContainer.children[i].classList.add("correct")
            }
        }
    }
    Next.classList.remove("hide")
    Skipping.classList.add("hide")
    quizBox.querySelector(".trc-score").innerHTML = correctAnswers;
    unclickableOptions();
}

function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}
function next() {
    if (questioncounter === quiz.length) {
        quizResult();
    }
    else {
        getNewQuestion();
    }
}
function quizOver() {
    quizBox.classList.add("hide");
    ResultBox.classList.remove("hide")
}

function quizResult() {
    ResultBox.querySelector(".total-question").innerHTML = quiz.length;
    ResultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    ResultBox.querySelector(".total-score").innerHTML = correctAnswers + "/" + quiz.length;
    ResultBox.querySelector(".total-skips").innerHTML = skips;
    ResultBox.querySelector(".total-wrong").innerHTML = quiz.length - (correctAnswers + skips);
    quizBox.classList.add("hide")
    ResultBox.classList.remove("hide")
}
function resetQuiz() {
    questioncounter = 0;
    currentquestion;
    availableQuestions = [];
    availableoptions = [];
    correctAnswers = 0;
}
function tryAgainQuiz() {
    ResultBox.classList.add("hide")
    quizBox.classList.remove("hide")
    resetQuiz();
    startQuiz();
}
function skip() {
    skips++;
    if (skips < 3 ){
        next();
    }
    if (skips == 3) {
        alert("you skipped three (3) questions, you can't skip any more .");
        Skipping.classList.add("hide");
        next();
    }

}
function home(){
    homeBox.classList.remove("hide")
    ResultBox.classList.add("hide")
    quizBox.classList.add("hide")
    resetQuiz();
}
function startQuiz() {
    homeBox.classList.add("hide")
    quizBox.classList.remove("hide")
    setAvailableQuestions();
    getNewQuestion();
}
window.onload = function () {
    homeBox.querySelector(".heading").innerHTML = quiz.length
}