import "../styles/Modal.css";
import { useNavigate } from "react-router-dom";

export default function Modal(props) {
  const navigate = useNavigate();
  const handleYesButton = () => {
    // TODO:アカウント削除機能が必要

    // アカウント削除後、トップページへ遷移する
    navigate("/");
  };
  const handleNoButton = () => {
    props.ModalOpen.setOpen(!props.ModalOpen.isOpen);
  };
  return (
    <>
      {props.ModalOpen.isOpen && (
        <div className="modal-overray">
          <div className="modal-content">
            本当に退会していいですか？
            <div className="modal-buttons">
              <button onClick={handleYesButton} className="modal-button">
                はい
              </button>
              <button onClick={handleNoButton} className="modal-button">
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
