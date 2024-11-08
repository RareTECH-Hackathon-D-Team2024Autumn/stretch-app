import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

export default function Signup() {
  // ルーティング設定
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/top");
  };

  return (
    <>
      <div className="formContainer">
        <form action="submit" methods="">
          <h1>ほぐし〜の</h1>
          <hr></hr>
          <div className="uiForm">
            <div className="formField">
              <label htmlFor="username">ユーザー名</label>
              <input
                id="username"
                type="text"
                placeholder="ユーザー名を入力"
                name="username"
              ></input>
            </div>
            <div className="formField">
              <label htmlFor="email">メールアドレス</label>
              <input
                id="email"
                type="text"
                placeholder="メールアドレスを入力"
                name="email"
              ></input>
            </div>
            <div className="formField">
              <label htmlFor="password">パスワード</label>
              <input
                id="password"
                type="password"
                placeholder="パスワードを入力"
                name="password"
              ></input>
            </div>
            <button className="submitButton" onClick={handleRegister}>
              登録
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
