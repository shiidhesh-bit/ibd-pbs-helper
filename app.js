let data = []

const search = document.getElementById("search")
const diseaseFilter = document.getElementById("diseaseFilter")
const phaseFilter = document.getElementById("phaseFilter")

fetch("ibd_pbs_codes.json")
.then(r => r.json())
.then(json => {

data = json
render(data)

})

function filter(){

let s = search.value.toLowerCase()
let disease = diseaseFilter.value
let phase = phaseFilter.value

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

render(results)

}

search.addEventListener("input",filter)
diseaseFilter.addEventListener("change",filter)
phaseFilter.addEventListener("change",filter)

function render(rows){

const tbody = document.querySelector("#results tbody")

tbody.innerHTML=""

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