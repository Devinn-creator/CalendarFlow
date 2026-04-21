let events = {};
let selectedDate = new Date();
let view = "dots";

function format(d) {
  return d.toISOString().split("T")[0];
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

/* DOT CALENDAR */
function renderDots() {
  const cal = document.getElementById("calendar");
  cal.className = "dots";
  cal.innerHTML = "";

  let year = selectedDate.getFullYear();
  let month = selectedDate.getMonth();
  let days = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= days; i++) {
    let d = new Date(year, month, i);
    let key = format(d);

    let dot = document.createElement("div");
    dot.className = "dot";
    dot.innerText = i;

    if (events[key]) dot.classList.add("has-event");
    if (key === format(selectedDate)) dot.classList.add("active");

    /* TOOLTIP */
    let tip = document.createElement("div");
    tip.className = "tooltip";
    tip.innerHTML = (events[key] || []).join("<br>") || "No events";
    dot.appendChild(tip);

    dot.onclick = () => {
      selectedDate = d;
      render();
    };

    cal.appendChild(dot);
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
    "Progress compounds daily",
    "You are building momentum"
  ];

  const wisdom = [
    "Aristotle: Excellence is a habit",
    "Nietzsche: He who has a why can bear any how",
    "Socrates: Know thyself"
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
  view = "dots";
  render();
};

document.getElementById("weekBtn").onclick = () => {
  view = "week";
  render();
};

/* MAIN */
function render() {
  if (view === "dots") renderDots();
  else renderWeek();

  renderCard();
  renderInsights();
}

render();
