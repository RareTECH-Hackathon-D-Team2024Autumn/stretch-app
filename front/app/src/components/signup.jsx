
export default function signup() {
  return (
    <>
      <div className="formContainer">
        <form action="submit" methods="">
          <h1>ほぐし〜の</h1>
          <hr></hr>
          <div className="uiForm">
            <div className="formField">
              <label>
                ユーザー名
                <input
                  type="text"
                  placeholder="ユーザー名を入力"
                  name="username"
                ></input>
              </label>
            </div>
            <div className="formField">
              <label>
                メールアドレス
                <input
                  type="text"
                  placeholder="メールアドレスを入力"
                  name="email"
                ></input>
              </label>
            </div>
            <div className="formField">
              <label>
                パスワード
                <input
                  type="text"
                  placeholder="パスワードを入力"
                  name="password"
                ></input>
              </label>
            </div>
            <button className="submitButton">登録</button>
          </div>
        </form>
      </div>
    </>
  );
}
