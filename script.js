let events = {};
let selectedDate = new Date();

/* UTIL */
function formatDate(d) {
  return d.toISOString().split("T")[0];
}

function getMonthDays(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/* ADD GOALS */
document.getElementById("addBtn").onclick = () => {
  const text = document.getElementById("goalInput").value.trim();
  const deadline = document.getElementById("deadline").value;

  if (!text || !deadline) return;

  const goals = text.split("\n").filter(g => g.trim());
  let current = new Date();
  let end = new Date(deadline);

  while (current <= end) {
    let key = formatDate(current);
    if (!events[key]) events[key] = [];
    goals.forEach(g => events[key].push(g));
    current.setDate(current.getDate() + 1);
  }

  render();
};

/* DOT VIEW */
function renderDots() {
  const cal = document.getElementById("calendar");
  cal.className = "dots";
  cal.innerHTML = "";

  let days = getMonthDays(selectedDate);
  let year = selectedDate.getFullYear();
  let month = selectedDate.getMonth();

  for (let i = 1; i <= days; i++) {
    let d = new Date(year, month, i);
    let key = formatDate(d);

    let el = document.createElement("div");
    el.className = "dot";
    el.innerText = i;

    if (events[key]) el.classList.add("has-event");
    if (key === formatDate(selectedDate)) el.classList.add("active");

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
    let key = formatDate(d);

    let div = document.createElement("div");
    div.className = "day";

    let list = (events[key] || []).map(e => `<li>${e}</li>`).join("");

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

  for (let i = -3; i <= 3; i++) {
    let d = new Date(selectedDate);
    d.setDate(d.getDate() + i);

    let key = formatDate(d);
    let card = document.createElement("div");
    card.className = "card";

    if (i === 0) card.classList.add("active");

    let list = (events[key] || []).map(e => `<li>${e}</li>`).join("");

    card.innerHTML = `
      <strong>${d.toDateString()}</strong>
      <ul>${list}</ul>
    `;

    flow.appendChild(card);
  }

  updateInsights();
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

/* INSIGHTS */
function updateInsights() {
  let key = formatDate(selectedDate);
  let list = events[key] || [];

  document.getElementById("todayList").innerHTML =
    list.map(i => `<li>${i}</li>`).join("");

  const affirmations = [
    "Stay consistent",
    "Keep going",
    "Progress matters"
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

/* RENDER */
function render() {
  if (document.getElementById("calendar").className === "week") {
    renderWeek();
  } else {
    renderDots();
  }
  renderFlow();
}

/* VIEW SWITCH */
document.getElementById("dotsBtn").onclick = renderDots;
document.getElementById("weekBtn").onclick = renderWeek;

/* INIT */
render();
