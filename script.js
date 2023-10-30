const questions = [
    {
        questionText: "What does HTML stand for?",
        options: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Text Multi Langauge"
        ],
        correct: 1,
    },
    {
        questionText: "Which CSS property is used to control the layout of elements on a web page?",
        options: [
            "display",
            "color",
            "font-size",
            "background-color"
        ],
        correct: 0,
    },
    {
        questionText: "What is the purpose of JavaScript in web development?",
        options: [
            "To style web pages",
            "To create structured documents",
            "To add interactivity to web pages",
            "To manage databases"
        ],
        correct: 2,
    },
    {
        questionText: "What is the role of a web server in web development?",
        options: [
            "To design the user interface",
            "To store and manage data",
            "To display web pages to users",
            "To optimize website performance"
        ],
        correct: 2,
    },
    {
        questionText: "Which programming language is often used for server-side web development?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "PHP"
        ],
        correct: 3,
    },
    {
        questionText: "What is the purpose of the HTML <head> element?",
        options: [
            "It contains the main content of the webpage.",
            "It defines the structure of the HTML document.",
            "It contains metadata about the document, such as the title and character encoding.",
            "It specifies the page's visual layout."
        ],
        correct: 2,
    },
    {
        questionText: "What is the purpose of the HTML <a> element?",
        options: [
            "It defines a section of code.",
            "It's used to create hyperlinks.",
            " It represents an image.",
            "It defines a table row."
        ],
        correct: 1,
    },
    {
        questionText: "Which HTML element is used to define the structure of an HTML document?",
        options: [
            "<structure>",
            "<layout>",
            "<body>",
            "<html>"
        ],
        correct: 3,
    },
    {
        questionText: "What is the primary function of the CSS float property?",
        options: [
            " It's used to add space between elements.",
            " It controls the background color of an element.",
            " It's used for text and image alignment within a web page layout.",
            " It sets the font size of text."
        ],
        correct: 2,
    },
    {
        questionText: "What does the acronym 'HTTP' stand for?",
        options: [
            "Hypertext Transfer Protocol",
            " Hyperlink Text Transfer Protocol",
            "High-Level Transfer Protocol",
            "High-Level Transfer Protocol"
        ],
        correct: 0,
    },
    {
        questionText: "What is a responsive web design?",
        options: [
            "A design that uses many images.",
            " A design that includes lots of text.",
            "An approach that makes web pages render well on a variety of devices and screen sizes.",
            "A design with flashy animations."
        ],
        correct: 2,
    },
    {
        questionText: "Which JavaScript keyword is used to declare a variable?",
        options: [
            "variable",
            "var, let, or const",
            "declare",
            "assign"
        ],
        correct: 1,
    },
    {
        questionText: "What does 'API' stand for in web development?",
        options: [
            "Application Programming Interface",
            "Automated Program Integration",
            "Application Program Instruction",
            "Advanced Programming Interface"
        ],
        correct: 0,
    },
    {
        questionText: "What is the box model in CSS?",
        options: [
            "It defines how elements are rendered, including their content, padding, border, and margin.",
            "It specifies the colors used on a web page.",
            "It defines the structure of a webpage.",
            "It defines the hierarchy of elements on a page."
        ],
        correct: 0,
    },
    {
        questionText: " Which JavaScript method is used to add a new item to the end of an array?",
        options: [
            "append()",
            "add()",
            "push()",
            "insert()"
        ],
        correct: 2,
    },
];



const startBox = document.querySelector(".start-quiz");
const startQuizBtn = document.querySelector(".start-quiz button");
const rulesBox = document.querySelector(".rules-box");
const exitBtn = document.querySelector(".exit");
const continueBtn = document.querySelector(".continue");
const quizBox = document.querySelector(".quiz-box");
const nextQueBtn = document.querySelector(".next-que-btn button");
const resultbox = document.querySelector(".result-box");
const restartBtn = document.querySelector(".restart");
const quitQuizBtn = document.querySelector(".quit");
const questionElem = document.querySelector(".question");
const optionElems = document.querySelectorAll(".option");
const line = document.querySelector(".line");
const time = document.querySelector(".time");
const currQue = document.querySelector(".currQue");
const totalQue = document.querySelector(".totalQue");

let index = 0;
let score = 0;
let counter = 15;
let optionSelected = false;
let intervalId;

// Function to auto select the correct option
const autoSelectCorrectOption = () => {
    const correctOptionIndex = questions[index].correct;
    optionElems[correctOptionIndex].click()
    score--;
};

// Function for quiz time
const timer = () => {
    intervalId = setInterval(() => {
        time.textContent = counter;
        if (counter === 0) {
            clearInterval(intervalId);
            autoSelectCorrectOption();
        }
        else {
            counter--;
            line.style.width = (counter / 15) * 100 + "%";
            line.style.transition = "all 1s linear";
        }
        if (counter < 10) {
            time.textContent = "0" + counter;
        }
    }, 1000)
}

// Function to update the score
const updateScore = () => {
    const yourScore = document.querySelector(".yourScore");
    let totalScore = document.querySelector(".totalScore");
    totalScore.textContent = questions.length;
    yourScore.textContent = score;
};

// Funtion to load the quizes
const loadQuiz = () => {
    questionElem.textContent = `${index + 1}. ${questions[index].questionText}`;  // show the question
    optionElems.forEach(option => {
        option.classList.remove("correct", "uncorrect");
    });
    optionElems.forEach((option, optionIndex) => {
        option.textContent = questions[index].options[optionIndex];
        option.style.cursor = "pointer";
        option.addEventListener("click", () => {
            if (!optionSelected) {
                optionSelected = true;
                clearInterval(intervalId);
                if (optionIndex === questions[index].correct) {
                    score++;
                    option.classList.add("correct");
                } else {
                    option.classList.add("uncorrect");
                    optionElems[questions[index].correct].classList.add("correct");
                }
                optionElems.forEach(option => {
                    option.style.cursor = "not-allowed";
                    option.removeEventListener("click", () => { });
                })
            }
            nextQueBtn.style.display = "block";
            updateScore();
        });
    });
    nextQueBtn.style.display = "none";
    totalQue.textContent = questions.length;
}

// If the startQuizBtn clicked
startQuizBtn.addEventListener("click", () => {
    startBox.classList.remove("active"); // Hide the startBox
    rulesBox.classList.add("active");       //  Show the rulesBox 
    clearInterval(intervalId);
    
    line.style.width = "100%";
    line.style.transition = "none";
});

// If the exitBtn clicked
exitBtn.addEventListener("click", () => {
    startBox.classList.add("active"); // Show the startBox
    rulesBox.classList.remove("active"); // Hide the rulesBox
});

// If the continueBtn clicked
continueBtn.addEventListener("click", () => {
    rulesBox.classList.remove("active"); // Hide the rulesBox
    quizBox.classList.add("active"); // Show the quizBox
    timer();
});

// if the nextQueBtn clicked
nextQueBtn.addEventListener("click", () => {
    index++;
    if (index < questions.length) {
        loadQuiz();
        currQue.textContent = index + 1;
    } else {
        quizBox.classList.remove("active");
        resultbox.classList.add("active");

    };
    counter = 15;
    time.textContent = counter;
    optionSelected = false;
    line.style.width = "100%";
    line.style.transition = "none";
    updateScore();
    timer();
})

// if the quitQuizBtn clicked
quitQuizBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    index = 0;
    score = 0;
    counter = 15;
    optionSelected = false;

    // hide the quizBox and resultBox
    quizBox.classList.remove("active");
    resultbox.classList.remove("active");

    // Show the start box
    startBox.classList.add("active");
    loadQuiz();
    currQue.textContent = index + 1
});


// if the restartBtn clicked
restartBtn.addEventListener("click", () => {
    index = 0;
    score = 0;
    counter = 15;
    optionSelected = false;

    // hide the result box 
    resultbox.classList.remove("active");
    quizBox.classList.add("active");

    line.style.width="100%";
    line.style.transition = "none";
    loadQuiz();
    currQue.textContent = index + 1;
});



updateScore();
loadQuiz();
