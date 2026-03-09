let data = []

const search = document.getElementById("search")
const diseaseFilter = document.getElementById("diseaseFilter")
const phaseFilter = document.getElementById("phaseFilter")

fetch("ibd_pbs_codes.json")
.then(r => r.json())
.then(json => {
  console.log("Data loaded successfully:", json.length, "items")
  data = json
  render(data)
  filter() // Initial filter call to ensure results are in sync
})
.catch(error => {
  console.error("Error loading ibd_pbs_codes.json:", error)
  const tbody = document.querySelector("#results tbody")
  tbody.innerHTML = '<tr><td colspan="7" style="color: red; text-align: center;">Error loading data. Please refresh the page.</td></tr>'
})

function filter(){
  let s = search.value.toLowerCase().trim()
  let disease = diseaseFilter.value.trim()
  let phase = phaseFilter.value.trim()

  console.log("Filtering with - Search:", s, "Disease:", disease, "Phase:", phase)

  let results = data.filter(item => {
    return (
      (disease === "" || item.disease === disease) &&
      (phase === "" || item.treatment_phase === phase) &&
      (
        s === "" ||
        item.drug.toLowerCase().includes(s) ||
        item.brand.toLowerCase().includes(s) ||
        item.pbs_code.toLowerCase().includes(s)
      )
    )
  })

  console.log("Filter results count:", results.length)
  render(results)
}

search.addEventListener("input",filter)
diseaseFilter.addEventListener("change",filter)
phaseFilter.addEventListener("change",filter)

function render(rows){
  const tbody = document.querySelector("#results tbody")
  tbody.innerHTML=""

  if(rows.length === 0){
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #666;">No results found. Try adjusting your search or filters.</td></tr>'
    return
  }

  rows.forEach(item=>{
    let tr=document.createElement("tr")
    tr.innerHTML=`
      <td>${item.drug} (${item.brand})</td>
      <td>${item.disease}</td>
      <td>${item.treatment_phase}</td>
      <td>${item.formulation}</td>
      <td>${item.pbs_code}</td>
      <td>${item.authority}</td>
      <td>${item.section}</td>
    `
    tbody.appendChild(tr)
  })
}

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("service-worker.js")
}