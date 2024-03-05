const startBtn = document.getElementById('start-btn');
const clearScoresBtn = document.getElementById('clear-scores')
const instructionsEl = document.getElementById('instructions')
const questionContainer = document.getElementById('question');
const answersElement = document.getElementById('answers');
const feedback = document.getElementById('feedback');
const timerElement = document.getElementById('time');
const viewScoresBtn = document.getElementById('view-scores');
const highScoresElement = document.getElementById('high-scores');
const scoresListElement = document.getElementById('scores-list');

let currentQuestionIndex, score, timer;

// Example questions
const questions = [
    { question: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "Hot Mail", "How To Make Lasagna"], correctAnswer: 0 },
    { question: "What does CSS stand for?", answers: ["Cascading Style Sheets", "Crazy Solid Shapes", "Carrot Soup Spicy"], correctAnswer: 0 },
    { question: "What is used to add interactivity to a website?", answers: ["HTML", "CSS", "JavaScript"], correctAnswer: 2 },
    { question: "Which HTML tag is used to define an internal style sheet?", answers: ["<style>", "<css>", "<script>"], correctAnswer: 0 },
    { question: "How do you create a function in JavaScript?", answers: ["function myFunction()", "function:myFunction()", "function = myFunction()"], correctAnswer: 0 },
    { question: "Which property is used to change the background color?", answers: ["color", "background-color", "bgcolor"], correctAnswer: 1 },
    { question: "How do you add a comment in a CSS file?", answers: ["// this is a comment", "/* this is a comment */", "<!-- this is a comment -->"], correctAnswer: 1 },
    { question: "Which method is used to round a number to the nearest integer in JavaScript?", answers: ["Math.round()", "Math.ceil()", "Math.floor()"], correctAnswer: 0 },
    { question: "Which attribute specifies a link's target URL?", answers: ["href", "src", "target"], correctAnswer: 0 },
    { question: "How do you declare a JavaScript variable?", answers: ["var myVar", "variable myVar", "v myVar"], correctAnswer: 0 },
    { question: "What symbol is used to select classes in CSS?", answers: [".", "#", "@"], correctAnswer: 0 },
    { question: "Which object in JavaScript can be used to ensure code runs after a specified time delay?", answers: ["Time", "Alarm", "setTimeout"], correctAnswer: 2 },
    { question: "What is the correct syntax for referring to an external script called 'xxx.js'?", answers: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>"], correctAnswer: 2 },
    { question: "How do you insert a comment in a HTML file?", answers: ["<!-- This is a comment -->", "// This is a comment", "/* This is a comment */"], correctAnswer: 0 },
    { question: "What HTML attribute is used to define inline styles?", answers: ["style", "styles", "format"], correctAnswer: 0 }
];

function startQuiz() {
    instructionsEl.style.display = 'none';
    startBtn.style.display = 'none';
    clearScoresBtn.style.display = 'none';
    highScoresElement.style.display = 'none';
    score = 0;
    currentQuestionIndex = 0;
    timer = 60;
    startTimer();
    showQuestion();
}

function startTimer() {
    const interval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(interval);
            endQuiz();
        }
    }, 1000);
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.textContent = question.question;
    answersElement.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const li = document.createElement('li');
        li.textContent = answer;
        li.addEventListener('click', () => selectAnswer(index));
        answersElement.appendChild(li);
    });
}

function selectAnswer(index) {
    if (index === questions[currentQuestionIndex].correctAnswer) {
        feedback.textContent = "Correct!";
        score += 10;
    } else {
        feedback.textContent = "Incorrect!";
        timer -= 10;
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    feedback.textContent = '';
    questionContainer.textContent = "Quiz Over!";
    answersElement.innerHTML = '';
    const initials = prompt("Your score is " + score + ". Enter your initials:");
    if (initials) {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push({ initials, score });
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }
    startBtn.textContent = "Restart";
    startBtn.style.display = '';
    displayHighScores();
}

function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    scoresListElement.innerHTML = '';
    highScores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = `${score.initials}: ${score.score}`;
        scoresListElement.appendChild(li);
    });
    highScoresElement.style.display = 'block';
    clearScoresBtn.style.display = 'inline-block';
}

function clearScores(){
    localStorage.removeItem('highScores');
    while (scoresListElement.firstChild){
        scoresListElement.removeChild(scoresListElement.firstChild)
    }
 
}

startBtn.addEventListener('click', startQuiz);

viewScoresBtn.addEventListener('click', (e) => {
    e.preventDefault();
    displayHighScores();
});

clearScoresBtn.addEventListener('click', clearScores);