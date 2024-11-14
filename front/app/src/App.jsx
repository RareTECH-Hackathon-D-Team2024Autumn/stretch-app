import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Top from "./components/Top";
import UserEdit from "./components/UserEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/top" element={<Top />} />
        <Route path="/useredit" element={<UserEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
