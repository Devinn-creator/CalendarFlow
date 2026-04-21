let events = {};
let selectedDate = new Date();
let currentView = "dots";

/* UTIL */
function format(d) {
  return d.toISOString().split("T")[0];
}

function daysInMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

/* ADD GOALS */
document.getElementById("addBtn").onclick = () => {
  const text = document.getElementById("goalInput").value.trim();
  const deadline = document.getElementById("deadline").value;
  if (!text || !deadline) return;

  const goals = text.split("\n").filter(g => g.trim());
  let cur = new Date();
  let end = new Date(deadline);

  while (cur <= end) {
    let key = format(cur);
    if (!events[key]) events[key] = [];
    goals.forEach(g => events[key].push(g));
    cur.setDate(cur.getDate() + 1);
  }

  render();
};

/* DOT VIEW */
function renderDots() {
  const cal = document.getElementById("calendar");
  cal.className = "dots";
  cal.innerHTML = "";

  let total = daysInMonth(selectedDate);
  let y = selectedDate.getFullYear();
  let m = selectedDate.getMonth();

  for (let i = 1; i <= total; i++) {
    let d = new Date(y, m, i);
    let key = format(d);

    let el = document.createElement("div");
    el.className = "dot";
    el.innerText = i;

    if (events[key]) el.classList.add("has-event");
    if (key === format(selectedDate)) el.classList.add("active");

    el.onclick = () => {
      selectedDate = d;
      render();
    };

    cal.appendChild(el);
  }
}

/* WEEK VIEW */
function renderWeek() {
  const cal = document.getElementById("calendar");
  cal.className = "week";
  cal.innerHTML = "";

  let start = new Date(selectedDate);
  start.setDate(start.getDate() - start.getDay() + 1);

  for (let i = 0; i < 7; i++) {
    let d = new Date(start);
    d.setDate(start.getDate() + i);
    let key = format(d);

    let div = document.createElement("div");
    div.className = "day";

    div.innerHTML = `
      <strong>${d.toDateString()}</strong>
      <ul>${(events[key] || []).map(e => `<li>${e}</li>`).join("")}</ul>
    `;

    cal.appendChild(div);
  }
}

/* CARD */
function renderCard() {
  let key = format(selectedDate);
  let list = events[key] || [];

  document.getElementById("card").innerHTML = `
    <h3>${selectedDate.toDateString()}</h3>
    <ul>${list.map(i => `<li>${i}</li>`).join("") || "<li>No events</li>"}</ul>
  `;
}

/* INSIGHTS */
function renderInsights() {
  let key = format(selectedDate);
  let list = events[key] || [];

  document.getElementById("todayList").innerHTML =
    list.map(i => `<li>${i}</li>`).join("");

  const affirmations = [
    "Stay consistent",
    "Progress matters",
    "Keep going"
  ];

  const wisdom = [
    "Aristotle: Excellence is habit",
    "Nietzsche: Purpose drives action"
  ];

  document.getElementById("affirmation").innerText =
    affirmations[Math.floor(Math.random() * affirmations.length)];

  document.getElementById("wisdom").innerText =
    wisdom[Math.floor(Math.random() * wisdom.length)];
}

/* NAV */
document.getElementById("prev").onclick = () => {
  selectedDate.setDate(selectedDate.getDate() - 1);
  render();
};

document.getElementById("next").onclick = () => {
  selectedDate.setDate(selectedDate.getDate() + 1);
  render();
};

/* VIEW SWITCH */
document.getElementById("dotsBtn").onclick = () => {
  currentView = "dots";
  render();
};

document.getElementById("weekBtn").onclick = () => {
  currentView = "week";
  render();
};

/* MAIN RENDER */
function render() {
  if (currentView === "dots") renderDots();
  else renderWeek();

  renderCard();
  renderInsights();
}

/* INIT */
render();
