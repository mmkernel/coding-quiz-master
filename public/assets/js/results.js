import dom from "./dom.js";
import { points, playerName, selectedTableName } from './index.js';


// VIEW SCORING LIST AND SAVE TO DB --------------------------------------------------------------------
const scoringListElements = () => {
  const scoringListDiv = dom.create({
    type: "div",
    parent: dom.$(".container"),
    classes: ["yourNameDiv"],
  })
  dom.create({
    type: "h2",
    content: "Scoring List",
    classes: ["welcome", "scoringTitle"],
    parent: scoringListDiv,
  })
  dom.create({
    type: "table",
    parent: scoringListDiv,
    classes: ['tableScoringList'],
    content: `<thead>
                <tr>
                <th>Player Name</th>
                <th>Quiz</th>
                <th>Points</th>
                </tr>
             </thead>
             <tbody>   
             </tbody>`
  })
  scoringListDiv.appendChild(restartBtn)
};

const saveToDB = () => {
  let quiz = selectedTableName.toUpperCase();
  const myResults = {
    playerName: playerName,
    quiz: selectedTableName,
    points: points,
  };
  console.log(myResults);

  fetch('/saveScore', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ playerName, quiz, points }),
})
    .then(response => response.json())
    .then(data => {
        if (data.data) {
            console.log(data.data);
            const scoringData = data.data;
            const tbody = dom.$('.tableScoringList tbody');
            tbody.innerHTML = ''; 

            scoringData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item.doc.playerName}</td><td>${item.doc.quiz}</td><td>${item.doc.points}</td>`;
                tbody.appendChild(row);
            });
        }
    })
    .catch(error => {
        console.error('Error saving and updating scoring data:', error);
    });
}

export const scoringListClickHandler = () => {
  scoringListElements();
  saveToDB();
};

export const scoringList = dom.create({
  type: "button",
  classes: ["btn", "scoring-list"],
  content: "View Scoring List",
  parent: dom.$(".end-screen"),
});

// END SCORING LIST ---------------------------------------------------------------------^

// START NEW QUIZ BUTTON ----------------------------------------------------------------
const restartBtn = dom.create({
    type: "button",
    classes: ['btn', 'restart'],
    content: "Start new Quiz",
    parent: dom.$(".end-screen")
  })
  restartBtn.addEventListener("click", () => window.location.reload());