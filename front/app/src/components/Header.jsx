import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleUserEdit = () => {
    navigate("/UserEdit");
  };
  return (
    <>
      <header className="header">
        <div className="top-page">Topページ</div>
        <div>
          <button className="align-button" onClick={handleUserEdit}>
            ユーザー情報
          </button>
        </div>
      </header>
    </>
  );
}
