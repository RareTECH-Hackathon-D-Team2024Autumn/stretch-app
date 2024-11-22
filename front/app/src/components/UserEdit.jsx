import { useState } from "react";
import Header from "./Header";
import "../styles/UserEdit.css";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export default function UserEdit() {
  const [isOpen, setOpen] = useState(false);
  const handleUnsubscribeButton = () => {
    setOpen(!isOpen);
  };

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

  // ルーティング
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/");
  };
  const handleEditClick = () => {
    navigate("/top");
  };
  return (
    <>
      <Header />
      {<Modal ModalOpen={{ isOpen, setOpen }} />}
      <button className="edit-button" onClick={handleEditClick}>
        Topページへ
      </button>
      <div className="editForm">
        <div className="editContainer">
          <input
            name="username"
            type="text"
            placeholder="ユーザー名"
            disabled={!isUserNameEdit}
          ></input>
          <button className="editButton" onClick={handleUserNameEditClick}>
            編集
          </button>
        </div>
        <div className="editContainer">
          <input
            name="email"
            type="text"
            placeholder="メールアドレス"
            disabled={!isEmailEdit}
          ></input>
          <button className="editButton" onClick={handleEmailEditClick}>
            編集
          </button>
        </div>
        <div className="editContainer">
          <input
            name="パスワード"
            type="password"
            placeholder="パスワード"
            disabled={!isPasswordEdit}
          ></input>
          <button className="editButton" onClick={handlePasswordEditClick}>
            編集
          </button>
        </div>
      </div>
      <div className="logoutContainer">
        <button className="logoutButton" onClick={handleLogoutClick}>
          ログアウト
        </button>
      </div>
      <button className="unsubscribeButton" onClick={handleUnsubscribeButton}>
        退会
      </button>
      <button className="saveButton">保存</button>
    </>
  );
}
