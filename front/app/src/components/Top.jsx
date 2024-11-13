import React from "react";
import "../styles/Top.css";
import Header from "./Header";

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
      <footer className="footer">
        <button className="footer-button">お気に入り一覧へ</button>
      </footer>
    </>
  );
}

export default Top;
