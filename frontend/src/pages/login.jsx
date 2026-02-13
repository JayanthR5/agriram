import API from "../services/api";
import { useState } from "react";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const login = async () => {
    const res = await API.post("/auth/login",{email,password});
    localStorage.setItem("token",res.data.token);
    alert("Logged in");
  };

  return (
    <>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </>
  );
}
