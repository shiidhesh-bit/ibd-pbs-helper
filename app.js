// app.js

let data = [];

const search = document.getElementById("search");
const diseaseFilter = document.getElementById("diseaseFilter");
const phaseFilter = document.getElementById("phaseFilter");

// Load PBS data from JSON
fetch("/ibd_pbs_codes.json") // Ensure the JSON is at the root of the deployment
  .then((r) => {
    if (!r.ok) throw new Error("Failed to load JSON file: " + r.status);
    return r.json();
  })
  .then((json) => {
    data = json;
    render(data); // Initial render with all data
  })
  .catch((err) => console.error("Error loading PBS data:", err));

// Filter function
function filter() {
  const s = search.value.toLowerCase();
  const disease = diseaseFilter.value;
  const phase = phaseFilter.value;

  const results = data.filter((item) => {
    return (
      (disease === "" || item.disease === disease) &&
      (phase === "" || item.treatment_phase === phase) &&
      (s === "" ||
        item.drug.toLowerCase().includes(s) ||
        item.brand.toLowerCase().includes(s) ||
        item.pbs_code.toLowerCase().includes(s))
    );
  });

  render(results);
}

// Event listeners
search.addEventListener("input", filter);
diseaseFilter.addEventListener("change", filter);
phaseFilter.addEventListener("change", filter);

// Render function
function render(rows) {
  const tbody = document.querySelector("#results tbody");
  tbody.innerHTML = "";

  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center">No results found</td></tr>`;
    return;
  }

  rows.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.drug} (${item.brand})</td>
      <td>${item.disease}</td>
      <td>${item.treatment_phase}</td>
      <td>${item.formulation}</td>
      <td>${item.pbs_code}</td>
      <td>${item.authority}</td>
      <td>${item.section}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Register service worker if supported
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service worker registered"))
    .catch((err) => console.error("Service worker registration failed:", err));
}
