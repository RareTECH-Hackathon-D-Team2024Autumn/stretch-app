import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Top from "./components/Top";
import UserEdit from "./components/UserEdit";
import { useEffect, useState } from "react";

export default function App() {
  const [allYturlData, setAllYturlData] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_TOP_ENDPOINT)
      .then((res) => res.json())
      .then((data) => setAllYturlData(data));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/top" element={<Top allYturlData={allYturlData} />} />
        <Route path="/useredit" element={<UserEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
