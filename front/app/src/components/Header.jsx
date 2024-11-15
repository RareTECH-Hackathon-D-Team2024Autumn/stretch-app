import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleUserEdit = () => {
    navigate("/UserEdit");
  };
  const handleTop = () => {
    navigate("/top");
  };

  return (
    <>
      <header className="header">
        <div className="top-page" onClick={handleTop}>
          Topページ
        </div>
        <div>
          <button className="align-button" onClick={handleUserEdit}>
            ユーザー情報
          </button>
        </div>
      </header>
    </>
  );
}
