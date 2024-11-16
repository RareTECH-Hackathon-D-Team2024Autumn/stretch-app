import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Top from "./components/Top";
import { useState } from "react";


function App() {
  const [allYturlData,setAllYturlData] = useState([]);

  const getAllYturlData = () =>{
    fetch("https://a43d9cf5-d889-4ff7-8926-3963283fd8a4.mock.pstmn.io/stretch_app/videoes")
  .then(res => res.json()).then(data => setAllYturlData(data))}
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/top" element={<Top allYturlData={allYturlData} getAllYturlData={getAllYturlData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
