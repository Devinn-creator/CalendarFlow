body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: #0b0f1a;
  color: #e5e7eb;
}

.app {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle button {
  background: #1f2937;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  margin-left: 6px;
  cursor: pointer;
}

.input {
  margin: 20px 0;
}

.input input {
  padding: 10px;
  border-radius: 10px;
  border: none;
  margin-right: 8px;
  background: #111827;
  color: white;
}

.input button {
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background: #22c55e;
  color: black;
  cursor: pointer;
}

/* DOT CALENDAR */
.calendar.dots {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
  margin-top: 20px;
}

.day-dot {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #1f2937;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: 0.2s;
}

.day-dot:hover {
  transform: scale(1.1);
}

.day-dot.active {
  background: #22c55e;
  color: black;
}

.event-indicator {
  position: absolute;
  bottom: 6px;
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
}

/* WEEK VIEW */
.calendar.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.day-box {
  background: #1f2937;
  padding: 10px;
  border-radius: 12px;
  min-height: 100px;
}

/* COVER FLOW */
.coverflow {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
}

#flowContainer {
  display: flex;
  gap: 20px;
  perspective: 1000px;
}

.flow-card {
  width: 160px;
  height: 120px;
  background: #1f2937;
  border-radius: 16px;
  padding: 10px;
  transform: scale(0.8);
  opacity: 0.5;
  transition: 0.3s;
}

.flow-card.active {
  transform: scale(1);
  opacity: 1;
}

/* INSIGHTS */
.insights {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.insights div {
  background: #1f2937;
  padding: 15px;
  border-radius: 12px;
}

let events = {};
let currentIndex = 3;
let dates = [];

const affirmations = [
  "Stay consistent.",
  "Small steps compound.",
  "You are progressing.",
  "Keep showing up."
];

const wisdom = [
  "Aristotle: Excellence is habit.",
  "Nietzsche: He who has a why...",
  "Socrates: Know thyself."
];

function format(d) {
  return d.toISOString().split("T")[0];
}

function generateDates() {
  dates = [];
  let now = new Date();

  for (let i = -3; i <= 3; i++) {
    let d = new Date();
    d.setDate(now.getDate() + i);
    dates.push(format(d));
  }
}

function addGoals(text, deadline) {
  let goals = text.split("\n").filter(g => g.trim() !== "");
  let start = new Date();
  let end = new Date(deadline);

  while (start <= end) {
    let key = format(start);
    if (!events[key]) events[key] = [];

    goals.forEach(g => events[key].push(g));

    start.setDate(start.getDate() + 1);
  }

  render();
}

document.getElementById("addBtn").onclick = () => {
  let text = document.getElementById("goalInput").value;
  let deadline = document.getElementById("deadline").value;
  if (text && deadline) addGoals(text, deadline);
};

/* DOT VIEW */
function renderDots() {
  const cal = document.getElementById("calendar");
  cal.className = "dots";
  cal.innerHTML = "";

  for (let i = 1; i <= 30; i++) {
    let d = new Date();
    d.setDate(i);
    let key = format(d);

    let el = document.createElement("div");
    el.className = "dot";
    el.innerText = i;

    if (events[key]) el.classList.add("active");

    el.onclick = () => {
      currentIndex = 3;
      generateDates();
      renderFlow();
    };

    cal.appendChild(el);
  }
}

/* WEEK VIEW */
function renderWeek() {
  const cal = document.getElementById("calendar");
  cal.className = "week";
  cal.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    let d = new Date();
    d.setDate(d.getDate() + i);
    let key = format(d);

    let div = document.createElement("div");
    div.className = "day";

    let list = (events[key] || [])
      .map(e => `<li>${e}</li>`)
      .join("");

    div.innerHTML = `
      <strong>${d.toDateString()}</strong>
      <ul>${list}</ul>
    `;

    cal.appendChild(div);
  }
}

/* COVER FLOW */
function renderFlow() {
  const flow = document.getElementById("flow");
  flow.innerHTML = "";

  dates.forEach((d, i) => {
    let card = document.createElement("div");
    card.className = "card";
    if (i === currentIndex) card.classList.add("active");

    let list = (events[d] || [])
      .map(e => `<li>${e}</li>`)
      .join("");

    card.innerHTML = `
      <strong>${d}</strong>
      <ul>${list}</ul>
    `;

    flow.appendChild(card);
  });

  updateInsights();
}

document.getElementById("prev").onclick = () => {
  if (currentIndex > 0) currentIndex--;
  renderFlow();
};

document.getElementById("next").onclick = () => {
  if (currentIndex < dates.length - 1) currentIndex++;
  renderFlow();
};

/* INSIGHTS */
function updateInsights() {
  let today = dates[currentIndex];
  let list = events[today] || [];

  document.getElementById("todayList").innerHTML =
    list.map(i => `<li>${i}</li>`).join("");

  document.getElementById("affirmation").innerText =
    affirmations[Math.floor(Math.random() * affirmations.length)];

  document.getElementById("wisdom").innerText =
    wisdom[Math.floor(Math.random() * wisdom.length)];
}

/* INIT */
document.getElementById("dotsBtn").onclick = renderDots;
document.getElementById("weekBtn").onclick = renderWeek;

generateDates();
renderDots();
renderFlow();
