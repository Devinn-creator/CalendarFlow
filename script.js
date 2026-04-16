function generatePlan() {
  const hoursPerDay = parseFloat(document.getElementById("hours").value);
  const goal = document.getElementById("goal").value;
  const totalHours = parseFloat(document.getElementById("goalHours").value);

  if (!hoursPerDay || !goal || !totalHours) {
    document.getElementById("output").innerHTML = "Please fill all fields.";
    return;
  }

  const daysNeeded = Math.ceil(totalHours / hoursPerDay);

  let plan = `
    <h3>Your Plan</h3>
    <p><strong>Goal:</strong> ${goal}</p>
    <p><strong>Daily Commitment:</strong> ${hoursPerDay} hrs/day</p>
    <p><strong>Estimated Completion:</strong> ${daysNeeded} days</p>
    <hr>
    <h4>Suggested Schedule:</h4>
  `;

  for (let i = 1; i <= daysNeeded; i++) {
    plan += `<p>Day ${i}: Work ${hoursPerDay} hours on ${goal}</p>`;
  }

  document.getElementById("output").innerHTML = plan;
}
