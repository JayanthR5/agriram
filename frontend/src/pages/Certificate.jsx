import API from "../services/api";
import {useEffect,useState} from "react";

export default function Certificate(){

const [qr,setQr]=useState("");

useEffect(()=>{
 API.get("/certificates/my").then(res=>setQr(res.data.qrCode));
},[]);

return qr && <img src={qr} alt="qr"/>;
}
