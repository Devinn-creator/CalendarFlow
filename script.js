let events = {};
let selectedDate = new Date();

/* UTIL */
function formatDate(d) {
  return d.toISOString().split("T")[0];
}

function getDaysInMonth(date) {
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

/* RENDER DOTS */
function renderCalendar() {
  const cal = document.getElementById("calendar");
  cal.innerHTML = "";

  let days = getDaysInMonth(selectedDate);
  let year = selectedDate.getFullYear();
  let month = selectedDate.getMonth();

  for (let i = 1; i <= days; i++) {
    let d = new Date(year, month, i);
    let key = formatDate(d);

    let dot = document.createElement("div");
    dot.className = "dot";
    dot.innerText = i;

    if (events[key]) dot.classList.add("has-event");
    if (key === formatDate(selectedDate)) dot.classList.add("active");

    dot.onclick = () => {
      selectedDate = d;
      render();
    };

    cal.appendChild(dot);
  }
}

/* RENDER SINGLE CARD */
function renderCard() {
  const card = document.getElementById("card");
  let key = formatDate(selectedDate);
  let list = events[key] || [];

  card.innerHTML = `
    <h3>${selectedDate.toDateString()}</h3>
    <ul>
      ${list.map(item => `<li>${item}</li>`).join("") || "<li>No events</li>"}
    </ul>
  `;
}

/* NAVIGATION */
document.getElementById("prev").onclick = () => {
  selectedDate.setDate(selectedDate.getDate() - 1);
  render();
};

document.getElementById("next").onclick = () => {
  selectedDate.setDate(selectedDate.getDate() + 1);
  render();
};

/* MAIN RENDER */
function render() {
  renderCalendar();
  renderCard();
}

/* INIT */
render();
