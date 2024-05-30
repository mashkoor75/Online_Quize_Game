const questions = [
   {
    question: "which is the largest animal in the world",
    answers:[
       { text: "shark", correct: false },
       {text: "Blue whale", correct: true},
       {text: "Elephant", correct: false},
       {text: "Giraffe", correct: false},
    ]
   },
   {
       question: "which is the smallest country in the world",
       answers:[
          {text: "Vatican City", correct: true},
          {text: "Bhutan", correct: false},
          {text: "Nepal", correct: false},
          {text: "Sri Lanka", correct: false},
       ]
      },
      {
       question: "which is the largest desert in the world",
       answers:[
          {text: "Kalahari", correct: false},
          {text: "Antarctica", correct: true},
          {text: "Sahara", correct: false},
          {text: "Gobi", correct: false},
       ]
      },
      {
       question: "which is the smallest continent in the world",
       answers:[
          {text: "Asia", correct: false},
          {text: "Australia", correct: true},
          {text: "Africa", correct: false},
          {text: "Antarctica", correct: false},
       ]
      }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
   currentQuestionIndex = 0;
   score = 0;
   nextButton.innerHTML = "Next";
   showQuestion();
}

function showQuestion(){
   resetState();
   let currentQuestion = questions[currentQuestionIndex];  // Fixed typo here
   let questionNo = currentQuestionIndex + 1;
   questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

   currentQuestion.answers.forEach(answer => {
       const button = document.createElement("button");
       button.innerHTML = answer.text;
       button.classList.add("btn");
       button.addEventListener("click", () => selectAnswer(button, answer.correct));
       answerButtons.appendChild(button);
   });
}

function resetState(){
   nextButton.style.display = "none";
   while(answerButtons.firstChild){
       answerButtons.removeChild(answerButtons.firstChild);
   }
}

function selectAnswer(button, correct){
   const buttons = answerButtons.querySelectorAll('.btn');
   buttons.forEach(btn => {
       btn.classList.add('btn-disabled');
       btn.disabled = true;
   });
   if(correct){
       button.classList.add("correct");
       score++;
   } else {
       button.classList.add("incorrect");
   }
   nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
   currentQuestionIndex++;
   if(currentQuestionIndex < questions.length){
       showQuestion();
   } else {
       showScore();
   }
});

function showScore(){
   resetState();
   questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
   nextButton.innerHTML = "Play Again";
   nextButton.style.display = "block";
   nextButton.addEventListener("click", startQuiz);
}

startQuiz();
