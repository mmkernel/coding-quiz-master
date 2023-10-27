"use strict";
import dom from "./dom.js";

// CONSTANTS AND VARIABLES ------------------------------------------------------------
let questions = [], time = 0, score = 0, points = 0, currentQuestion, timer, playerName = "";
const timePerQ = [10, 20, 30, 50, 60];
const container = dom.$(".container");
const progressBar = dom.$(".progress-bar");
const progressText = dom.$(".progress-text");
const startBtn = dom.$(".start");
//const timePerQuestion = dom.$("#time");
const quiz = dom.$(".quiz");
const startScreen = dom.$(".start-screen");
const welcome = dom.$(".welcome");
const settings = dom.$(".settings");

// PROGRESS FUNCTION ----------------------------------------------------------------
const progress = value => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

// START RENDER ELEMENTS --------------------------------------------------------------
const welcomeElements = () => {
  const yourNameDiv = dom.create({
    type: "div",
    parent: container,
    classes: ["yourNameDiv"],
  });
  dom.create({
    type: "input",
    parent: yourNameDiv,
    classes: ["yourName"],
    attr: { name: "playerName", placeholder: "Player name.." },
  }),
    dom.create({
      type: "button",
      parent: yourNameDiv,
      content: "Enter your name",
      classes: ["btn", "yourNameBtn"],
    })
}
if (playerName == "") welcomeElements();

const renderElements = () => {
    dom.create({
      type: "label",
      parent: settings,
      content: "Choose a program language:"
    }),
    dom.create({
      type: "select",
      parent: settings,
      content: "Program language:",
      classes: ['category']
    }),
    dom.create({
      type: "label",
      parent: settings,
      content: "Select time per question:",
      attr: {for: 'time'}
    }),
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
    //console.log(data);
    const selectElement = dom.$(".category");
    data.tables.forEach((tableName) => {
      const option = document.createElement("option");
      option.value = tableName;
      option.text = tableName;
      selectElement.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching table names:", error);
  });

// END FETCHING THE TABLE NAMES FOR SELECT ELEMENT -------------------------------------

const goToStart = () => {
  let userName = dom.$(".yourName");
  playerName = userName.value;
  // console.log(userName);
  welcome.innerHTML = `Welcome ${playerName}!`;
  dom.$(".yourNameDiv").style.display = "none";
};
const yourNameBtn = dom.$(".yourNameBtn");
yourNameBtn.addEventListener("click", goToStart);

// START LOADING QUESTIONS FROM DB ----------------------------------------------------------------

const loadContents = () => {
  return fetch("/load_contents")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.status == "ok") {
        return res.data;
      } else {
        throw res.err;
      }
    });
};

const startQuiz = () => {
  loadingAnimation();

  questions = results;
  console.log(questions);
  console.log(questions[0]);
  setTimeout(() => {
    startScreen.classList.add("hide");
    quiz.classList.remove("hide");
    currentQuestion = 1;
    showQuestion(questions[0]);
  }, 1000);
};

startBtn.addEventListener("click", startQuiz);

// START QUIZ QUESTIONS ----------------------------------------------------------------
const showQuestion = (question) => {
  const questionText = document.querySelector(".question");
  const answersWrapper = document.querySelector(".answer-wrapper");
  const questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];
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

  questionNumber.innerHTML = ` Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
            <span class="total">/${questions.length}</span>`;
  //add event listener to each answer
  const answersDiv = document.querySelectorAll(".answer");
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
      playAdudio("./assets/countdown.mp3");
    }
    if (time >= 0) {
      progress(time);
      time--;
    } else {
      checkAnswer();
    }
  }, 1000);
};

const loadingAnimation = () => {
  startBtn.innerHTML = "Loading";
  const loadingInterval = setInterval(() => {
    if (startBtn.innerHTML.length === 10) {
      startBtn.innerHTML = "Loading";
    } else {
      startBtn.innerHTML += ".";
    }
  }, 500);
};
// END START TIMER & ANIMATION FUNCTION ----------------------------------------------------------------^

// CREATED BY FUNCTION ---------------------------------------------------------------------------------
const createdBy = () => {
  let copyright = document.createElement("div");
  copyright.innerHTML =
    "A Project By <a href='https://www.mmkernel.com' target=_blank><strong>Momcilo Milic</strong></a>";
  copyright.className = "copyright";
  document.body.appendChild(copyright);
};
createdBy();
// END CREATED BY FUNCTION -------------------------------------------------------------------------------^

const submitBtn = document.querySelector(".submit");
const nextBtn = document.querySelector(".next");
submitBtn.addEventListener("click", () => {
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

// CHECK ANSWER ----------------------------------------------------------------
const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    console.log(currentQuestion);
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      const correctAnswer = document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answer
          ) {
            answer.classList.add("correct");
          }
        });
    }
  } else {
    const correctAnswer = document
      .querySelectorAll(".answer")
      .forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuestion - 1].correct_answer
        ) {
          answer.classList.add("correct");
        }
      });
  }
  const answersDiv = document.querySelectorAll(".answer");
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
const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score"),
  totalPoints = dom.$(".total-points");
const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  points = score * 5;
  console.log(points);
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
  if (points >= 20) {
    totalPoints.innerHTML = `Great job ${playerName}!<br>You've scored: ${points}`;
  } else if (points >= 10) {
    totalPoints.innerHTML = `Not bad ${playerName}<br> You've scored ${points} points!`;
  } else if ((points == 5)) {
    totalPoints.innerHTML = `${playerName} you've scored just<br>${points} points :'(`;
  } else {
    totalPoints.innerHTML = `You have to learn ${playerName}! You didn't score any points`;
  }
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
  console.log(playerName);
});

const playAdudio = (src) => {
  const audio = new Audio(src);
  audio.play();
};
// END SHOWING RESULTS ----------------------------------------------------------------