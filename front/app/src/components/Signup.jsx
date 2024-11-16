import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import { useState } from "react";

export default function Signup() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // ルーティング設定
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/Top");
  };

  return (
    <>
      <div className="formContainer">
        <form action="submit" methods="">
          <h1>ほぐし〜の</h1>
          <div className="uiForm">
            <div className="formField">
              <label htmlFor="username">ユーザー名</label>
              <input
                id="username"
                type="text"
                placeholder="ユーザー名を入力"
                name="username"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="formField">
              <label htmlFor="email">メールアドレス</label>
              <input
                id="email"
                type="text"
                placeholder="メールアドレスを入力"
                name="email"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="formField">
              <label htmlFor="password">パスワード</label>
              <input
                id="password"
                type="password"
                placeholder="パスワードを入力"
                name="password"
                onChange={(e) => handleChange(e)}
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
