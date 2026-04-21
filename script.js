let events = {};
let selectedDateIndex = 0;
let dates = [];

const affirmations = [
  "Stay consistent.",
  "You are building momentum.",
  "Focus on progress.",
  "You’re in control."
];

const wisdom = [
  "Aristotle: We are what we repeatedly do.",
  "Nietzsche: He who has a why can bear any how.",
  "Socrates: Know thyself."
];

function formatDate(d) {
  return d.toISOString().split("T")[0];
}

function generateDates() {
  dates = [];
  let now = new Date();

  for (let i = -3; i <= 3; i++) {
    let d = new Date();
    d.setDate(now.getDate() + i);
    dates.push(formatDate(d));
  }
}

function addGoal(goal, deadline) {
  let start = new Date();
  let end = new Date(deadline);

  while (start <= end) {
    let key = formatDate(start);
    if (!events[key]) events[key] = [];
    events[key].push(goal);

    start.setDate(start.getDate() + 1);
  }

  render();
}

document.getElementById("add").onclick = () => {
  let goal = document.getElementById("goal").value;
  let deadline = document.getElementById("deadline").value;
  if (goal && deadline) addGoal(goal, deadline);
};

document.getElementById("monthBtn").onclick = () => renderDots();
document.getElementById("weekBtn").onclick = () => renderWeek();

function renderDots() {
  const cal = document.getElementById("calendar");
  cal.className = "calendar dots";
  cal.innerHTML = "";

  for (let i = 1; i <= 30; i++) {
    let d = new Date();
    d.setDate(i);
    let key = formatDate(d);

    let el = document.createElement("div");
    el.className = "day-dot";
    el.innerText = i;

    if (events[key]) {
      let dot = document.createElement("div");
      dot.className = "event-indicator";
      el.appendChild(dot);
    }

    el.onclick = () => {
      selectedDateIndex = 3;
      generateDates();
      renderFlow();
    };

    cal.appendChild(el);
  }
}

function renderWeek() {
  const cal = document.getElementById("calendar");
  cal.className = "calendar week";
  cal.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    let d = new Date();
    d.setDate(d.getDate() + i);
    let key = formatDate(d);

    let el = document.createElement("div");
    el.className = "day-box";
    el.innerHTML = `<strong>${d.toDateString()}</strong><br>${
      (events[key] || []).join("<br>") || ""
    }`;

    cal.appendChild(el);
  }
}

function renderFlow() {
  const container = document.getElementById("flowContainer");
  container.innerHTML = "";

  dates.forEach((d, i) => {
    let card = document.createElement("div");
    card.className = "flow-card";

    if (i === selectedDateIndex) card.classList.add("active");

    card.innerHTML = `
      <strong>${d}</strong><br>
      ${(events[d] || []).join("<br>") || "No tasks"}
    `;

    container.appendChild(card);
  });

  updateInsights();
}

document.getElementById("prev").onclick = () => {
  if (selectedDateIndex > 0) {
    selectedDateIndex--;
    renderFlow();
  }
};

document.getElementById("next").onclick = () => {
  if (selectedDateIndex < dates.length - 1) {
    selectedDateIndex++;
    renderFlow();
  }
};

function updateInsights() {
  let today = dates[selectedDateIndex];
  document.getElementById("today").innerHTML =
    (events[today] || []).join("<br>") || "No events";

  document.getElementById("affirmation").innerText =
    affirmations[Math.floor(Math.random() * affirmations.length)];

  document.getElementById("wisdom").innerText =
    wisdom[Math.floor(Math.random() * wisdom.length)];
}

generateDates();
renderDots();
renderFlow();
