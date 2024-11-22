import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const initialValues = { user_name: "", mail_address: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // ルーティング設定
  const navigate = useNavigate();
  const handleRegister = () => {
    e.preventDefault(); // JSメソッド、フォームがデフォルトでリロードされるのを防止

    // データをJSON形式に変換
    try {
      const response = await axios.post(`${process.env.REACT_APP_REGISTER_ENDPOINT}`, JSON.stringify(formValues),
        {
          headers: {
            "Content-Type": "application/json", //HTTPヘッダの一つでデータの形式を指定するのに使用。この場合リクエストのヘッダにはJSON形式のデータがあることを伝える 
          },
        }
      );

      console.log(response.data);  //axiosではレスポンスデータはresponse.dataで取得できる
      setResponseMessage(response.data.message || "登録されました！");

      navigate("/top"); //Topページに遷移

    } catch (error) {
      console.error("登録中にエラーが発生しました。：", error);
      setResponseMessage("登録中にエラーが発生しました。")
    }
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
                name="user_name"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="formField">
              <label htmlFor="email">メールアドレス</label>
              <input
                id="email"
                type="text"
                placeholder="メールアドレスを入力"
                name="mail_address"
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
          <p className="responseMessage">{responseMessage}</p>
        </form>
      </div>
    </>
  );
}
