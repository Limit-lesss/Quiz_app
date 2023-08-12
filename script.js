const questions = [
    {
        question : " Who invented C++?",
        answer : [
            { text: "Dennis Ritchie" , correct: false},
            { text: "Bjarne Stroustrup" , correct: true},
            { text: "Brian Kernighan" , correct: false},
            { text: "Ken Thompson" , correct: false}
        ]
    },
    {
        question : "Which of the following is the correct syntax of including a user defined header files in C++?",
        answer : [
            { text: "#include “userdefined”" , correct: true},
            { text: " #include [userdefined]" , correct: false},
            { text: "#include <userdefined.h>" , correct: false},
            { text: "#include <userdefined>" , correct: false}
        ]
    },
    {
        question : "Which of the following is a correct identifier in C++?",
        answer : [
            { text: "7var_name" , correct: false},
            { text: "7VARNAME" , correct: false},
            { text: "$var_name" , correct: false},
            { text: "VAR_1234" , correct: true}
        ]
    },
    {
        question : "Which of the following is not a type of Constructor in C++?",
        answer : [
            { text: "Friend constructor" , correct: true},
            { text: "Default constructor" , correct: false},
            { text: "Parameterized constructor" , correct: false},
            { text: "Copy constructor" , correct: false}
        ]
    },
    {
        question : "Which of the following approach is used by C++?",
        answer : [
            { text: "Left-right" , correct: false},
            { text: "Right-left" , correct: false},
            { text: "Top-down" , correct: false},
            { text: "Bottom-up" , correct: true}
        ]
    }
];

const question = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");
let outerDiv = document.getElementById("outer");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    question.innerHTML = `${currentQuestionIndex + 1}. `  + questions[currentQuestionIndex].question;

    questions[currentQuestionIndex].answer.forEach((answer)=>{
        let button = document.createElement("button");
        button.classList.add("option");
        button.innerHTML = answer.text ;
        answerBtn.appendChild(button);
        if(answer.correct) button.dataset.correct = answer.correct ;
        button.addEventListener("click",selectAnswer);
    });
}
startQuiz();

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(event){
   const selectedBtn = event.target ;
   const isCorrect = selectedBtn.dataset.correct === "true";
   if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
   }else{
    selectedBtn.classList.add("incorrect");
   }
   Array.from(answerBtn.children).forEach(button =>{
    if(button.dataset.correct ===  "true"){
        button.classList.add("correct");
    }
    button.disabled = true ;
   });
   nextBtn.style.display = "block";
}
function showScore(){
    resetState();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click",function(){
    if(currentQuestionIndex < questions.length)
      handleNextBtn();
    else{
        startQuiz();
    }
});



