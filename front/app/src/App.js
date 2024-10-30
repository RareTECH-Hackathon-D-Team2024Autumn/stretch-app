import {useState} from "react";
import './App.css';

function App() {
  const initialValues = {mailAddress: "",password: ""};
  const [formValues,setForValues] = useState(initialValues);

  const handleChange = (e) => {
    // 
    const { name, value } =e.target;
    setForValues({...formValues,name:value});

  }


  return (
    <div className="formContainer">
      <form>
        <h1>ほぐし〜の</h1>
        <div className="uiForm">
          <div className="formField">
            <lavel>メールアドレス</lavel>
            <input 
              type="text" 
              placeholder="メールアドレスを入力してください" 
              name="mailAddress" 
              onChange={(e) => handleChange(e)}/>
          </div>
          <div className="formField">
            <lavel>パスワード</lavel>
            <input type="text" placeholder="パスワードを入力してください" name="password"/>
          </div>
          <div className= "Button">
            <button className="submitButton">新規登録</button>
            <button className="loginButton">ログイン</button>
          </div>
        </div>
      </form>
      
    </div>
  );
}

export default App;
