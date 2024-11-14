import React from "react";
import "../styles/Top.css";
import Header from "./Header";
import Footer from "./Footer";

function Top() {
  return (
    <>
      <Header />
      <main className="maincontainer">
        <div>
          <div className="favoritecontainer">
            <p className="favoritecheck">お気に入り</p>
          </div>
          <div className="urlcontainer">
            <a href="https://www.youtube.com/">ここに動画のURL情報が載る</a>
          </div>
          <div className="urlcontainer">
            <a href="https://www.youtube.com/">ここに動画のURL情報が載る</a>
          </div>
          <div className="urlcontainer">
            <a href="https://www.youtube.com/">ここに動画のURL情報が載る</a>
          </div>
          <div className="urlcontainer">
            <a href="https://www.youtube.com/">ここに動画のURL情報が載る</a>
          </div>
          <div className="urlcontainer">
            <a href="https://www.youtube.com/">ここに動画のURL情報が載る</a>
          </div>
          <div className="urlcontainer">
            <a href="https://www.youtube.com/">ここに動画のURL情報が載る</a>
          </div>
          <div className="urlcontainer">
            <a href="https://www.youtube.com/">ここに動画のURL情報が載る</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Top;
