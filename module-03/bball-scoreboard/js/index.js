let homeTeam = {
  designation: "home",
  points: 0,
  fouls: 5,
  timeouts: 7
};

let awayTeam = {
  designation: "home",
  points: 0,
  fouls: 5,
  timeouts: 7
};

const teams = [homeTeam, awayTeam]

const scoreCards = document.getElementsByClassName("pts-card");
const timeOuts = document.getElementsByClassName("timeout");

// render the latest scores in the HTML
function updateScores() {
  // update the points for each team based on the data in the objects
  for (let i = 0; i < 2; i++) {
    scoreCards[i].textContent = teams[i].points
  }

  // change the styling according to which team is in the lead
  const homePoints = parseInt(scoreCards[0].textContent);
  const awayPoints = parseInt(scoreCards[1].textContent);

  if (homePoints > awayPoints) {
    scoreCards[0].style.color = "#ffd100";
    scoreCards[0].style.border = "4px solid #ffd100"

    scoreCards[1].style.color = "#333333";
    scoreCards[1].style.border = "4px solid #333333";
  } else if (homePoints < awayPoints) {
    scoreCards[1].style.color = "#ffd100";
    scoreCards[1].style.border = "4px solid #ffd100"

    scoreCards[0].style.color = "#333333";
    scoreCards[0].style.border = "4px solid #333333";
  } else {
    scoreCards[0].style.color = "#333333";
    scoreCards[0].style.border = "4px solid #333333";

    scoreCards[1].style.color = "#333333";
    scoreCards[1].style.border = "4px solid #333333";
  }
}

// render the number of events (fouls/time-outs) remaining for each team
function updateItems(eventType) {
  for (let i = 0; i < 2; i++) {
    const teamContainer = document.getElementsByClassName("team-section")[i];
    const teamItems = teamContainer.getElementsByClassName(eventType);

    const n = eventType == "foul" ? 5 : 7;

    for (let j = 0; j < n; j++) {
      if (j < teams[i][eventType + "s"]) {
        teamItems[j].style.background = "#333333";
      } else {
        teamItems[j].style.background = "none";
      }
    }
  }
}

// reset the team object values to their default initial values
function resetGame() {
  for (let i = 0; i < 2; i ++) {
    teams[i].points = 0;
    teams[i].fouls = 5;
    teams[i].timeouts = 7;
  }

  updateScores();
  updateItems("foul");
  updateItems("timeout");

  // reenable all gameplay buttons
  const gameplayButtons = document.getElementsByClassName("gameplay-btn");
  for (let i = 0, n = gameplayButtons.length; i< n; i++) {
    gameplayButtons[i].disabled = false;
  }
}

function addPoints(teamIndex, points) {
  teams[teamIndex].points += points;
  updateScores();
}

function removeFoul(teamIndex) {
  teams[teamIndex].fouls--;
  updateItems("foul");

  // disable button if the team is out of fouls
  if (teams[teamIndex].fouls == 0) {
    document.getElementsByClassName("foul-btn")[teamIndex].disabled = true;
  }
}

function removeTimeOut(teamIndex) {
  teams[teamIndex].timeouts--;
  updateItems("timeout");

  // disable button if the team is out of time-outs
  if (teams[teamIndex].timeouts == 0) {
    document.getElementsByClassName("timeout-btn")[teamIndex].disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateScores();
  updateItems("foul");
  updateItems("timeout");
})