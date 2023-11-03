"use strict";
import dom from "./dom.js";
import {scoringList, scoringListClickHandler} from "./results.js";

// CONSTANTS AND VARIABLES ------------------------------------------------------------
let questions = [], time = 0, score = 0,  currentQuestion, timer, results, audio;
export let points = 0;
export let playerName = "";
export let selectedTableName;
const timePerQ = [10, 20, 30, 50, 60];
const container = dom.$(".container");
const progressBar = dom.$(".progress-bar");
const progressText = dom.$(".progress-text");
const quiz = dom.$(".quiz");
const startScreen = dom.$(".start-screen");
const welcome = dom.$(".welcome");
const settings = dom.$(".settings");

// START RENDER ELEMENTS --------------------------------------------------------------
const welcomeElements = () => {
  const yourNameDiv = dom.create({
    type: "div",
    parent: container,
    classes: ["yourNameDiv"],
  })
  dom.create({
    type: "h2",
    content: "CODING MASTER",
    parent: yourNameDiv,
    classes: ["heading"]
  })
  dom.create({
    type: "input",
    parent: yourNameDiv,
    classes: ["yourName"],
    attr: { name: "playerName", placeholder: "Player name.." }
  })
  dom.create({
    type: "button",
    parent: yourNameDiv,
    content: "Enter your name",
    classes: ["btn", "yourNameBtn"]
  })
}
welcomeElements();

const renderElements = () => {
    dom.create({
      type: "label",
      parent: settings,
      content: "Choose a program language:"
    });
    dom.create({
      type: "select",
      parent: settings,
      classes: ['category']
    });
    dom.create({
      type: "label",
      parent: settings,
      content: "Select time per question:",
      attr: {for: 'time'}
    });
    dom.create({
      type: "select",
      parent: settings,
      attr: {id: "time"}
    });
    timePerQ.forEach((time) => {
      dom.create({
        type: "option",
        parent: dom.$('#time'),
        content: time,
        attr: {value: time}
      })
    })
};
renderElements();
// END RENDER ELEMENTS --------------------------------------------------------------^

// FETCHING THE TABLE NAMES FOR SELECT ELEMENT ---------------------------------------
fetch("/tables")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    const selectElement = dom.$(".category");

    // FILTER OUT THE "scoringlist" TABLE FROM PROGRAM LANGUAGES SELECT ELEMENT
    const tableNames = data.tables.filter((tableName) => tableName !== "scoringlist");
    console.log(tableNames);

    tableNames.forEach((tableName) => {
      dom.create({
        type: "option",
        attr: {value: tableName},
        content: tableName.toUpperCase(),
        parent: selectElement
      })
    });
  })
  .catch((error) => {
    console.error("Error fetching table names:", error);
  });

// END FETCHING THE TABLE NAMES FOR SELECT ELEMENT -------------------------------------
const tableSelect = dom.$('.category');
tableSelect.addEventListener('change', () => {
  selectedTableName = tableSelect.value;

  fetch(`/tables/${selectedTableName}`)
    .then(response => response.json())
    .then(data => {
      //console.log(data.data[0].doc.incorrect_answers);
      results = data.data;
      
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});


const goToStart = () => {
  let userName = dom.$(".yourName");
  playerName = userName.value;
  if (playerName.length === 0) {
    dom.$(".yourName").style.border = "3px solid red";
  } else {
    welcome.innerHTML = `Welcome ${playerName}!<br>Let's test your skills...`;
    dom.$(".yourNameDiv").style.display = "none";
  }
};
const yourNameBtn = dom.$(".yourNameBtn");
yourNameBtn.addEventListener("click", goToStart);

// START LOADING QUESTIONS FROM DB ----------------------------------------------------------------
const startQuiz = () => {
  // CONVERTING THE DATA TO NEW OBJECT WITHOUT DOC
  const transformedData = results.map(item => ({
    category: item.doc.category,
    question: item.doc.question,
    correct_answer: item.doc.correct_answer,
    incorrect_answers: item.doc.incorrect_answers
  }));
  //console.log(transformedData);

  questions = transformedData;
  console.log(questions);
  setTimeout(() => {
    startScreen.classList.add("hide");
    quiz.classList.remove("hide");
    currentQuestion = 1;
    showQuestion(questions[0]);
  }, 1000);
};

const startBtn = dom.create({
  type: "button",
  parent: startScreen,
  content: "Start Quiz",
  classes: ["btn", "start"]
});

startBtn.addEventListener("click", startQuiz);

// PROGRESS FUNCTION ----------------------------------------------------------------
const progress = val => {
  const percentage = (val / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${val}`;
};

// START QUIZ QUESTIONS ----------------------------------------------------------------
const showQuestion = question => {
  const questionText = dom.$(".question");
  const answersWrapper = dom.$(".answer-wrapper");
  const questionNumber = dom.$(".number");

  questionText.innerHTML = question.question;

  const answers = [...question.incorrect_answers, question.correct_answer.toString(), ];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
                  <div class="answer ">
            <span class="text">${answer}</span>
            <span class="checkbox">
              <i class="fas fa-check"></i>
            </span>
          </div>
        `;
  });
  
  questionNumber.innerHTML = `${selectedTableName.toUpperCase()}: Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
            <span class="total">/${questions.length}</span>`;
  //add event listener to each answer
  const answersDiv = dom.$$(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  time = dom.$("#time").value;
  // console.log(time);
  startTimer(time);
};
// END  QUIZ QUESTIONS ----------------------------------------------------------------------------------

// START TIMER & ANIMATION FUNCTION ----------------------------------------------------------------
const startTimer = time => {
  timer = setInterval(() => {
    if (time === 3) {
      playAudio("./assets/countdown.mp3");
    }
    if (time >= 0) {
      progress(time);
      time--;
    } else {
      checkAnswer();
    }
  }, 1000);
};


// END START TIMER & ANIMATION FUNCTION ----------------------------------------------------------------^

// CREATED BY  -----------------------------------------------------------------------------------------
const createdBy = () => {
  dom.create({
    type: "div",
    content: "A Project By <a href='https://www.mmkernel.com' target=_blank><strong>Momcilo Milic</strong></a>",
    classes: ['copyright'],
    parent: document.body
  })

};
createdBy();
// END CREATED BY ---------------------------------------------------------------------------------------^

const submitBtn = dom.create({
  type: "button",
  parent: quiz,
  content: "Submit",
  classes: ["btn", "submit"]
});
const nextBtn = dom.create({
  type: "button",
  parent: quiz,
  content: "Next",
  classes: ["btn", "next"]
});

submitBtn.addEventListener("click", () => {
  checkAnswer();
  stopAudio();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

// CHECK ANSWER ----------------------------------------------------------------
const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = dom.$(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    console.log(currentQuestion);
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      dom.$$(".answer").forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answer
          ) {
            answer.classList.add("correct");
          }
        });
    }
  } else {
      dom.$$(".answer").forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuestion - 1].correct_answer
        ) {
          answer.classList.add("correct");
        }
      });
  }
  const answersDiv = dom.$$(".answer");
  answersDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    showQuestion(questions[currentQuestion - 1]);
  } else {
    showScore();
  }
};
// END CHECK ANSWER -------------------------------------------------------------------

// START SHOWING RESULTS ----------------------------------------------------------------
const endScreen = dom.$(".end-screen");
const finalScore = dom.$(".final-score");
const totalScore = dom.$(".total-score");
const totalPoints = dom.$(".total-points");
const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  points = score * 5;
  console.log(points);
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
  if (points >= 20) {
    totalPoints.innerHTML = `Great job ${playerName}!<br>You've scored: ${points} 🔥 points!`;
  } else if (points >= 10) {
    totalPoints.innerHTML = `You can do it better ${playerName} 🧐<br> You've scored ${points} points!`;
  } else if ((points == 5)) {
    totalPoints.innerHTML = `${playerName} you've scored just<br>${points} points 🫣`;
  } else {
    totalPoints.innerHTML = `You have to learn ${playerName}!<br>You didn't score any points 😬`;
  }
};
// END SHOWING RESULTS --------------------------------------------------------------------------------

// SCORING LIST EVENT LISTENER ------------------------------------------------------------------------
scoringList.addEventListener("click", scoringListClickHandler );


// PLAY & STOP COUNTDOWN FUNCTION ----------------------------------------------------------------------
const playAudio = (src) => {
  if (audio) audio.pause(); 
  audio = new Audio(src);
  audio.play();
};

const stopAudio = () => {
  if (audio) audio.pause();
};