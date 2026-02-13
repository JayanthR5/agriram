import API from "../services/api";
import { useState,useEffect } from "react";

export default function ExporterDashboard(){

const [batches,setBatches]=useState([]);
const [product,setProduct]=useState("");

useEffect(()=>{
  API.get("/batches/my").then(res=>setBatches(res.data));
},[]);

const createBatch = async ()=>{
 await API.post("/batches",{productType:product});
 alert("Batch Created");
};

return(
<>
<input placeholder="Product" onChange={e=>setProduct(e.target.value)} />
<button onClick={createBatch}>Create Batch</button>

{batches.map(b=><div key={b._id}>{b.productType} - {b.status}</div>)}
</>
);
}

