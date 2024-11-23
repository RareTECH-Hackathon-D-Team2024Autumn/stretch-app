import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const initialValues = { mailAddress: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => { 
    const { name, value } =e.target;
    setFormValues({...formValues,[name]:value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // ルーティング設定
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/top");
  };

  return (
    <div className="formContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>ほぐし〜の</h1>
        <div className="uiForm">
          <div className="formField">
            <lavel>メールアドレス</lavel>
            <input
              type="text"
              placeholder="メールアドレスを入力してください"
              name="mailAddress"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="formField">
            <lavel>パスワード</lavel>
            <input
              type="text"
              placeholder="パスワードを入力してください"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="Button">
            <button className="submitButton" onClick={handleSignup}>
              新規登録
            </button>
            <button className="loginButton" onClick={handleLogin}>
              ログイン
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
