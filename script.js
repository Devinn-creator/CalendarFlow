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
