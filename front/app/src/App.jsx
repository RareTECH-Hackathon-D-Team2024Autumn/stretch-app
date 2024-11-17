import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Top from "./components/Top";
import { useEffect, useState } from "react";



export default function App() {
  const [allYturlData,setAllYturlData] = useState([]);

  useEffect(() =>{
    const topendpoint = process.env.REACT_APP_TOP_ENDPOINT;

    fetch(topendpoint)
  .then(res => res.json()).then(data => setAllYturlData(data))
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/top" element={<Top allYturlData={allYturlData} />} />
      </Routes>
    </BrowserRouter>
  );
}
