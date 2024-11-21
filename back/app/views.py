## 必要なモジュールのインポート
from flask import Blueprint, request, render_template, redirect, url_for, flash, jsonify, make_response
from flask_login import login_user, login_required, logout_user, current_user
from app.models import User
from datetime import datetime, date
from app import db
from wtforms import ValidationError
import re

## Blueprintのインスタンス化
bp = Blueprint('stretch_app', __name__, url_prefix='', template_folder='./templates/build/', static_folder='./templates/build/static/')

## ログイン画面の表示
@bp.route('/')
def home():
    #response = make_response(render_template('Signup.jsx'))
    #return response
    return render_template('index.html') ## !ログイン画面のファイル名を追加! ##

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
    data = request.get_json()
    mail_address = data['mail_address']
    password = data['password']
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
    return render_template('index.html', last_access=datetime.now()) ##login画面の追加##



## ユーザー登録機能
# URLが/registerの時##ログインページ##を表示し、register()関数の処理を行う（通信はget,postメソッド）
@bp.route('/register', methods=['GET', 'POST'])
def register():
    # 書き込まれた項目を取得
    data = request.get_json()
    user_name = data['user_name']
    mail_address = data['mail_address']
    password = data['password']
    print(data)
    # メールアドレスを正規表現で指定
    pattern = "^[a-zA-Z0-9_.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-.]{2,}+$"
    # POSTリクエスト
    if request.method == 'POST':
        # 空欄がある場合
        if user_name == '' or mail_address == '' or password == '':
            # flashモジュールを使用した文字の表示
            #flash('入力されていないフォームがあります')
            ValidationError_form = str('入力されていないフォームがあります')
            return jsonify(ValidationError_form)
            # raise ValidationError('入力されていないフォームがあります。') #from
        # メールアドレス形式の不一致
        elif re.match(str(pattern), mail_address) is None:
            ValidationError_mail = str('メールアドレスの形式になっていません')
            return jsonify(ValidationError_mail)
            #raise ValidationError('メールアドレスの形式になっていません') #mail
            #flash('メールアドレスの形式になっていません')
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
                ValidationError_mail_match = str('既に登録されています')
                return jsonify(ValidationError_mail_match)
                #raise ValidationError('既に登録されています') #mail_match
                #flash('既に登録されています')
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
                # responseにjsonで返すデータを格納
                #response = jsonify(data)
                #response.status_code = 200
                # 成功したらログインページに遷移する
                return redirect(url_for('stretch_app.home'))
    #return render_template('register.html')## !（ページ名）! ##
    return jsonify(data)
    #make_response(jsonify(response))
## トップページの表示
@bp.route('/videoes')
# ユーザーがログインしていない場合は、login_manager.login_viewによってstretch_app.loginに遷移する
@login_required
def top():
    return render_template('index.html') ## !トップページ画面のファイル名を追加! ##
