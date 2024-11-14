import Header from "./Header";
export default function UserEdit() {
  return (
    <>
      <Header />
      <div>編集したい項目の編集ボタンを押して保存で編集ができます</div>
      <div>
        <input
          name="username"
          type="text"
          placeholder="ユーザー名"
          disabled
        ></input>
        <button>編集</button>
      </div>
      <div>
        <input
          name="email"
          type="text"
          placeholder="メールアドレス"
          disabled
        ></input>
        <button>編集</button>
      </div>
      <div>
        <input
          name="パスワード"
          type="password"
          placeholder="パスワード"
          disabled
        ></input>
        <button>編集</button>
      </div>
    </>
  );
}
