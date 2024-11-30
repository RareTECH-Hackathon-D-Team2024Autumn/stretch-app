import React,{ useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const initialValues = { mail_address: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // ルーティング設定
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN_ENDPOINT,JSON.stringify(formValues),
        {
          headers: {
            "Content-Type": "application/json" //HTTPヘッダの一つでデータの形式を指定するのに使用。この場合リクエストのヘッダにはJSON形式のデータがあることを伝える 
          },
        });
      localStorage.setItem("mail_address",response.data.mail_address);
      setResponseMessage(response.data.message || "ログイン成功！");
      navigate("/top");
    } catch (error){ 
      
      const errorMessage = error.response.data.message || "ログインに失敗しました。";
      
      setResponseMessage(errorMessage);
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleLogin}>
        <h1>ほぐし〜の</h1>
        <div className="uiForm">
          <div className="formField">
            <label>メールアドレス</label>
            <input
              type="text"
              placeholder="メールアドレスを入力してください"
              name="mail_address"
              onChange={ handleChange}
            />
          </div>
          <div className="formField">
            <label>パスワード</label>
            <input
              type="password"
              placeholder="パスワードを入力してください"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="Button">
            <button type="button" className="submitButton" onClick={handleSignup}>
              新規登録
            </button>
            <button type="submit" className="loginButton">
              ログイン
            </button>
          </div>
        </div>
      </form>
      <p className="responseMessage">{responseMessage}</p>
    </div>
  );
}
