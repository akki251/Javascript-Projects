const quizData = [
  {
    question: "how old is florin ?",
    a: "10",
    b: "15",
    c: "17",
    d: "18",
    correct: "c",
  },

  {
    question: "What is most loved programming language ?",
    a: "C++",
    b: "Java",
    c: "Javascript",
    d: "Python",
    correct: "c",
  },

  {
    question:
      "Javascript and Java are same, just two different versions of each other",
    a: "correct",
    b: "It was correct before 2004",
    c: "wrong",
    d: "none",
    correct: "c",
  },

  {
    question: "what does HTML stands for?",
    a: "Hyper Text Markup Language",
    b: "Hyper Text Makeup Language",
    c: "Hyper Text Markup Log",
    d: "none",
    correct: "a",
  },

  {
    question: "what year was Javascript launched ? ",
    a: "2003",
    b: "1996",
    c: "1995",
    d: "none",
    correct: "c",
  },
];
const quiz = document.getElementById("quiz");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const questionEl = document.getElementById("question-text");
const submitBtn = document.getElementById("submit");
let currentQuestion = 0;

loadQues();

let score = 0;
function loadQues() {
  const currentQuiz = quizData[currentQuestion];
  questionEl.innerHTML = currentQuiz.question;

  a_text.innerHTML = currentQuiz.a;
  b_text.innerHTML = currentQuiz.b;
  c_text.innerHTML = currentQuiz.c;
  d_text.innerHTML = currentQuiz.d;
}

let answer = undefined;

function getSelected() {
  const answersEls = document.querySelectorAll(".answer");

  let answer = undefined;

  answersEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  console.log(answer);
  if (answer) {
    if (answer === quizData[currentQuestion].correct) {
      score++;
    }
    currentQuestion++;
    deSelectAns();
    if (currentQuestion < quizData.length) loadQues();
    else {
     
      quiz.innerHTML = `<h2> You answered correctly at ${score} / ${quizData.length} questions.</h2>
      <button onclick ="location.reload()">Reload</button>`;
    }
  }
});

function deSelectAns() {
  const answersEls = document.querySelectorAll(".answer");

  answersEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}
