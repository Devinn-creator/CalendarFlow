const calendarEl = document.getElementById("calendar");
const todaySummary = document.getElementById("todaySummary");
const affirmationEl = document.getElementById("affirmation");
const wisdomEl = document.getElementById("wisdom");

let currentView = "month";
let events = {};

const affirmations = [
  "Stay consistent.",
  "Progress over perfection.",
  "You are capable.",
  "Small steps matter."
];

const wisdomQuotes = [
  "We are what we repeatedly do. – Aristotle",
  "He who has a why can bear any how. – Nietzsche",
  "The unexamined life is not worth living. – Socrates"
];

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function addGoal(goal, deadline) {
  let start = new Date();
  let end = new Date(deadline);
  let days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  for (let i = 0; i <= days; i++) {
    let d = new Date();
    d.setDate(d.getDate() + i);
    let key = d.toISOString().split("T")[0];

    if (!events[key]) events[key] = [];
    events[key].push(goal);
  }

  render();
}

document.getElementById("addGoalBtn").onclick = () => {
  const goal = document.getElementById("goalInput").value;
  const deadline = document.getElementById("deadlineInput").value;
  if (goal && deadline) addGoal(goal, deadline);
};

document.getElementById("monthViewBtn").onclick = () => {
  currentView = "month";
  render();
};

document.getElementById("weekViewBtn").onclick = () => {
  currentView = "week";
  render();
};

function render() {
  calendarEl.innerHTML = "";

  if (currentView === "month") renderMonth();
  else renderWeek();

  updateSummary();
}

function renderMonth() {
  calendarEl.className = "calendar month-view";

  for (let i = 1; i <= 30; i++) {
    let day = document.createElement("div");
    day.className = "day";
    day.innerText = i;

    let date = new Date();
    date.setDate(i);
    let key = date.toISOString().split("T")[0];

    if (events[key]) {
      let dot = document.createElement("div");
      dot.className = "dot";
      day.appendChild(dot);
    }

    day.onclick = () => showDay(key);
    calendarEl.appendChild(day);
  }
}

function renderWeek() {
  calendarEl.className = "calendar week-view";

  for (let i = 0; i < 7; i++) {
    let day = document.createElement("div");
    day.className = "day";

    let date = new Date();
    date.setDate(date.getDate() + i);
    let key = date.toISOString().split("T")[0];

    day.innerText = date.toDateString();

    if (events[key]) {
      events[key].forEach(e => {
        let div = document.createElement("div");
        div.innerText = e;
        day.appendChild(div);
      });
    }

    day.onclick = () => showDay(key);
    calendarEl.appendChild(day);
  }
}

function showDay(key) {
  let dayEvents = events[key] || [];
  todaySummary.innerHTML = dayEvents.join("<br>") || "No events";
}

function updateSummary() {
  let today = getToday();
  showDay(today);

  affirmationEl.innerText =
    affirmations[Math.floor(Math.random() * affirmations.length)];

  wisdomEl.innerText =
    wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)];
}

render();
