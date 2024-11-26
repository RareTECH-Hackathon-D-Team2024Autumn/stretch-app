import { useNavigate } from "react-router-dom";
import "../styles/Favorite.css";
import Header from "./Header";

export default function Favorite() {
  const navigate = useNavigate();
  const handleTopButton = () => {
    navigate("/top");
  };
  return (
    <>
      <Header />
      <button className="top-button" onClick={handleTopButton}>
        トップページへ
      </button>
    </>
  );
}
