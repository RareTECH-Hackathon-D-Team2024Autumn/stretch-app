import React from 'react';
import Yturl from './Yturl';
import "../styles/Top.css";

function Top() {
  return (
    <>
      <header className="header">
        <div className="top-page">Topページ</div>
        <div>
          <button className="align-button">ユーザー情報</button>
        </div>
      </header>
      <main className="maincontainer">
        <div>
          <div className="favoritecontainer">
            <p className="favoritecheck">お気に入り</p>
          </div>
          <div>
            <Yturl/>
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
