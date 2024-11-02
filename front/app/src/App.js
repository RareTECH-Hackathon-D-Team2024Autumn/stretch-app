import {useState} from "react";
import './App.css';

function App() {
  const initialValues = {mailAddress: "",password: ""};
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);

  const handleChange = (e) => {
    // 
    const { name, value } =e.target;
    setFormValues({...formValues,[name]:value});
    console.log(formValues);
  };

  const handleSubmit =(e) => {
    e.preventDefault();
    //ログイン情報を送信する
    //バリデーションチェックする
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if(!values.mailAddress){
      errors.mailAddress = "メールアドレスを入力してください";
    } else if(!regex.test(values.mailAddress)) {
      errors.mailAddress = "正しいメールアドレスを入力してください";
    }
    if(!values.password){
      errors.password = "パスワードを入力してください";
    } else if (values.password.length < 4) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    } else if (values.password.length > 15) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    }
    return errors;
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
          <p className="errorMsg">{formErrors.mailAddress}</p>
          <div className="formField">
            <lavel>パスワード</lavel>
            <input 
              type="text" 
              placeholder="パスワードを入力してください" 
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErrors.password}</p>
          <div className= "Button">
            <button className="submitButton">新規登録</button>
            <button className="loginButton">ログイン</button>
          </div>
          <div>
            {Object.keys(formErrors).length === 0 && isSubmit &&
            (
              <div className="msgOK">ログインに成功しました</div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
