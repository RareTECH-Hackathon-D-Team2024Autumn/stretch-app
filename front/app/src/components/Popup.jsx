import { useNavigate } from "react-router-dom";

export default function Popup(props) {
  const navigate = useNavigate();
  const handleYesButton = () => {
    // TODO:アカウント削除機能が必要

    // アカウント削除後、トップページへ遷移する
    navigate("/");
  };
  const handleNoButton = () => {
    props.PopupBehavior.setPopupVisible(!props.PopupBehavior.isPopupVisible);
  };
  return (
    <>
      {console.log(props)}
      {props.PopupBehavior.isPopupVisible && (
        <div className="popup">
          <p>本当に退会していいですか？</p>
          <button onClick={handleYesButton}>はい</button>
          <button onClick={handleNoButton}>いいえ</button>
        </div>
      )}
    </>
  );
}
