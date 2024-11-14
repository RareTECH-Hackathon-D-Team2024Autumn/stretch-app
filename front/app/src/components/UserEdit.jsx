import { useState } from "react";
import Header from "./Header";

export default function UserEdit() {
  const [isUserNameEdit, setIsUserNameEdit] = useState(false);
  const handleUserNameEditClick = () => {
    if (!isUserNameEdit) {
      setIsUserNameEdit(true);
    } else {
      setIsUserNameEdit(false);
    }
  };
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const handleEmailEditClick = () => {
    if (!isEmailEdit) {
      setIsEmailEdit(true);
    } else {
      setIsEmailEdit(false);
    }
  };
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const handlePasswordEditClick = () => {
    if (!isPasswordEdit) {
      setIsPasswordEdit(true);
    } else {
      setIsPasswordEdit(false);
    }
  };
  return (
    <>
      <Header />
      <div>編集したい項目の編集ボタンを押して保存で編集ができます</div>
      <div>
        <input
          name="username"
          type="text"
          placeholder="ユーザー名"
          disabled={!isUserNameEdit}
        ></input>
        <button onClick={handleUserNameEditClick}>編集</button>
      </div>
      <div>
        <input
          name="email"
          type="text"
          placeholder="メールアドレス"
          disabled={isEmailEdit}
        ></input>
        <button onClick={handleEmailEditClick}>編集</button>
      </div>
      <div>
        <input
          name="パスワード"
          type="password"
          placeholder="パスワード"
          disabled={!isPasswordEdit}
        ></input>
        <button onClick={handlePasswordEditClick}>編集</button>
      </div>
    </>
  );
}
