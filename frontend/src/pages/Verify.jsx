import API from "../services/api";
import {useState} from "react";

export default function Verify(){

const [hash,setHash]=useState("");

const verify = async()=>{
 const res = await API.post("/verify",{qrHash:hash});
 alert(res.data.status);
};

return(
<>
<input placeholder="Paste QR Hash" onChange={e=>setHash(e.target.value)} />
<button onClick={verify}>Verify</button>
</>
);
}
