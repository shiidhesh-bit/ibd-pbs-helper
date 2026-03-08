const fs = require("fs")

const drugs = [
"adalimumab",
"infliximab",
"vedolizumab",
"ustekinumab",
"tofacitinib",
"upadacitinib"
]

const raw = JSON.parse(fs.readFileSync("pbs_full_dataset.json"))

let results = []

raw.forEach(item=>{

let name = item.drug_name.toLowerCase()

if(drugs.some(d=>name.includes(d))){

results.push({

 drug:item.drug_name,
 brand:item.brand,
 disease:item.indication,
 treatment_phase:item.phase,
 formulation:item.form,
 pbs_code:item.pbs_code,
 authority:item.authority,
 section:item.section

})

}

})

fs.writeFileSync("ibd_pbs_codes.json",JSON.stringify(results,null,2))

console.log("IBD dataset generated")
