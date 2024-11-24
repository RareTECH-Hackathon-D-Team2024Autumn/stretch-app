import { useLocation } from "react-router-dom";

export default function Header() {
  const pathName = useLocation().pathname;
  return (
    <>
      <header className="header">
        {pathName === "/top" && <div className="top-page">Topページ</div>}
        {pathName === "/UserEdit" && (
          <div className="top-page">ユーザー情報編集</div>
        )}
      </header>
    </>
  );
}
