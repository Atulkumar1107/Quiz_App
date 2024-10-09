document.addEventListener('DOMContentLoaded', () => {

    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const choicesList = document.getElementById("choices-list");
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById("score");

    const questions = [
        {
            question: "What is your Current City?",
            choices: ['Delhi', 'Uttar Pradesh', 'Uttarakhand', 'Himachal Pradesh'],
            answer: "Uttar Pradesh",
        },
        {
            question: "What is your Age?",
            choices: ['Less than 20', 'Less than 30', 'Less than 40', 'Less than 50'],
            answer: "Less than 30",
        },
        {
            question: "What is your Qualification?",
            choices: ['10th', '12th', 'Graduation', 'Post Graduation'],
            answer: "Graduation",
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    });
    restartBtn.addEventListener('click', restartQuiz);

    function startQuiz() {
        startBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    }

    function showQuestion() {
        resetChoices();  
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        currentQuestion.choices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => selectAnswer(li, choice));
            choicesList.appendChild(li);
        });
    }

    function resetChoices() {
        choicesList.innerHTML = '';  
    }

    function selectAnswer(selectedChoiceElement, selectedChoice) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedChoice === currentQuestion.answer) {
            selectedChoiceElement.classList.add('correct');
            score++;
        } else {
            selectedChoiceElement.classList.add('incorrect');
        }
       
        Array.from(choicesList.children).forEach(choice => {
            choice.removeEventListener('click', selectAnswer);
            choice.classList.add('disabled');
        });
        nextBtn.classList.remove('hidden');
    }

    function endQuiz() {
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.textContent = `Your Score: ${score} out of ${questions.length}`;
        nextBtn.classList.add('hidden');
    }

    function restartQuiz() {
        resultContainer.classList.add('hidden');
        startBtn.classList.remove('hidden');
        currentQuestionIndex = 0;
        score = 0;
    }
});
