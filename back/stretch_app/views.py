## 必要なモジュールのインポート
from flask import Blueprint, request, render_template, redirect, url_for, flash
from flask_login import login_user, login_required, logout_user, current_user
from stretch_app.models import User
from datetime import datetime, date
from stretch_app import db
import re

## Blueprintのインスタンス化
bp = Blueprint('stretch_app', __name__, url_prefix='')

## ログイン画面の表示
@bp.route('/')
def home():
    return render_template('home.html') ## !ログイン画面のファイル名を追加! ##

## ログアウト
@bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('stretch_app.home'))

## ログイン
@bp.route('/login', methods=['GET', 'POST'])
def login():
    # 書き込まれた項目の取得
    mail_address = request.form.get('mail_address')
    password = request.form.get('password')
    # POSTリクエストの場合
    if request.method == 'POST':
        user = User.select_by_mail_address(mail_address)
        # メールアドレスとパスワードが正しい場合
        if user and user.validate_password(password):
           login_user(user)
           next = request.args.get('next')
           if not next:
               next = url_for('stretch_app.top')
           return redirect(next)
    return render_template('login.html', last_access=datetime.now()) ##login画面の追加##



## ユーザー登録機能
# URLが/registerの時##ログインページ##を表示し、register()関数の処理を行う（通信はget,postメソッド）
@bp.route('/register', methods=['GET', 'POST'])
def register():
    # 書き込まれた項目を取得
    user_name = request.form.get('user_name')
    mail_address = request.form.get('mail_address')
    password = request.form.get('password')

    # メールアドレスを正規表現で指定
    pattern = "^[a-zA-Z0-9_.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-.]{2,}+$"

    # POSTリクエスト
    if request.method == 'POST':
        # 空欄がある場合
        if user_name == '' or mail_address == '' or password == '':
            # flashモジュールを使用した文字の表示
            flash('入力されていないフォームがあります')
        # メールアドレス形式の不一致
        elif re.match(pattern, mail_address) is None:
            flash('メールアドレスの形式になっていません')
        # 全て正しかった場合
        else:
            # 書き込まれた項目の取得
            user = User (
                user_name = user_name,
                mail_address = mail_address,
                password = password
            )
            # データベースにあるメールアドレスを取得する
            # データベースにメールアドレスが登録されていなければNone
            DBuser = User.select_by_mail_address(mail_address)

            # メールアドレスが取得された場合
            if DBuser != None:
                flash('既に登録されています')
            # メールアドレスが取得されなかった場合
            else:
                # データベースへ書き込む
                try:
                    # データベースへの接続を開始（明示的なトランザクションをTrueにする）
                    with db.session.begin(subtransactions=True):
                        # データベースに書き込むデータを用意する（引数は先ほどのuser）
                        db.session.add(user)
                    # データベースに書き込みを実行する
                    db.session.commit()
                # 書き込みがうまくいかない場合
                except:
                    # データベースへのお書き込みを行わずロールバック
                    db.session.rollback()
                # データベースとの接続を終了
                finally:
                    db.session.close()
                # 成功したらログインページに遷移する
                return redirect(url_for('stretch_app.home'))
    return render_template('register.html')## !（ページ名）! ##

## トップページの表示
@bp.route('/top')
# ユーザーがログインしていない場合は、login_manager.login_viewによってstretch_app.loginに遷移する
@login_required
def top():
    return render_template('top.html') ## !トップページ画面のファイル名を追加! ##
