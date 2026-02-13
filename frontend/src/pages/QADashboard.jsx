import API from "../services/api";
import {useEffect,useState} from "react";

export default function QA(){

const [batches,setBatches]=useState([]);

useEffect(()=>{
 API.get("/inspections/pending").then(res=>setBatches(res.data));
},[]);

const inspect = async(id)=>{
 await API.post("/inspections",{batchId:id,result:"PASS"});
 alert("Inspected");
};

return(
<>
{batches.map(b=>
<div key={b._id}>
{b.productType}
<button onClick={()=>inspect(b._id)}>Approve</button>
</div>
)}
</>
);
}
