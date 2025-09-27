const quizData = [
  {
    question: "What is the result of '2' + 2 in JavaScript?",
    choices: ['4', '22', 'NaN', 'Error'],
    correctAnswer: 1,
  },
  {
    question: 'Which method is used to add elements to the end of an array?',
    choices: ['push()', 'pop()', 'unshift()', 'shift()'],
    correctAnswer: 0,
  },
  {
    question: 'What does `NaN` stand for in JavaScript?',
    choices: [
      'No Any Number',
      'Negative Any Number',
      'Null and None',
      'Not a Number',
    ],
    correctAnswer: 3,
  },
];


const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const submitElement = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');
const questionContainer = document.getElementById('question-container')

let currentQuestion = 0;
let score = 0;
const wrongAnswers = [];

function loadQuestion() {
  const {question, choices} = quizData[currentQuestion];
  questionElement.textContent = question;
  choicesElement.innerHTML = '';

  choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.addEventListener('click', () => selectChoice(index))
    choicesElement.appendChild(button);
  })

}

function selectChoice(index) {
  
  [...choicesElement.children].forEach((button) => {
    button.classList.remove('selected');
  })
  choicesElement.children[index].classList.add('selected');

}

function submitAnswer() {
  const selectedButton = choicesElement.querySelector('.selected');
  if(!selectedButton) return;

  const selectedIndex = [...choicesElement.children].indexOf(selectedButton);
  const q = quizData[currentQuestion]
  if(selectedIndex === q.correctAnswer) {
    score++;
  } else {
    wrongAnswers.push({
      question: q.question,
      userAnswer : q.choices[selectedIndex],
      correctAnswer: q.choices[q.correctAnswer]
    })
  }

  currentQuestion++;

  if(currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult(){
  questionContainer.style.display = 'none';
  submitElement.style.display = 'none';
  const pct = Math.round((score * 100) / quizData.length);
  let resultHTML = `
  <p class='score'> You scored ${pct}% </p>
  `

  if(wrongAnswers.length > 0) {
    resultHTML += '<h3> Wrong Answers </h3>'
    resultHTML += '<ul>';
      wrongAnswers.forEach((answer) => {
        resultHTML += `
          <li>
            <p>Question : ${answer.question}</p>
            <p> Your Answer :<span class = 'wrong'> ${answer.userAnswer} </span> </p>
            <p>Correct Answer : ${answer.correctAnswer}</p> 
          </li>
        `;
      });
    resultHTML += '</ul>';
  }
  resultElement.innerHTML = resultHTML;
}



submitElement.addEventListener('click', () => submitAnswer())

loadQuestion();