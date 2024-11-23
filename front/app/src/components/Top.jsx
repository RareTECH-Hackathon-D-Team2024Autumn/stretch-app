import React from "react";
import "../styles/Top.css";
import Header from "./Header";
import Footer from "./Footer";
import Yturl from "./Yturl";
import { useNavigate } from "react-router-dom";

export default function Top(props) {
  const navigate = useNavigate();
  const handleUserEdit = () => {
    navigate("/UserEdit");
  };

  return (
    <>
      <Header />
      <button className="edit-button" onClick={handleUserEdit}>
        ユーザー情報
      </button>
      <main className="maincontainer">
        <div>
          <Yturl allYturlData={props.allYturlData} />
        </div>
      </main>
      <button className="favorite-button">お気に入り一覧へ</button>
      <Footer />
    </>
  );
}
