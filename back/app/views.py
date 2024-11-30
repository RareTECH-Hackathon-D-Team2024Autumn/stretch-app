## 必要なモジュールのインポート
from flask import Blueprint, request, render_template, redirect, url_for, flash, jsonify, make_response
from flask_login import login_user, login_required, logout_user, current_user
from app.models import User, Top, YouTube
from datetime import datetime, date
from app import db, login_manager
from wtforms import ValidationError
from sqlalchemy import and_
import re, json

## Blueprintのインスタンス化
bp = Blueprint('stretch_app', __name__, url_prefix='', template_folder='./templates/build/', static_folder='./templates/build/static/')

## ログアウト
@bp.route('/logout')
@login_required
def logout():
    logout_user()

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
           # ログインしたユーザーのidと同一の動画情報を取得する
           login_id = current_user.id
           video_info = db.session.query(YouTube, YouTube.id, YouTube.title, YouTube.url, YouTube.thumbnail, YouTube.created_at).join(Top, login_id == Top.user_id)
           for video_infos in video_info:
            #print("id:{}, タイトル{}:, URL:{}, サムネイル:{}, 更新時間:{}".format(video_infos.id, video_infos.title, video_infos.url, video_infos.thumbnail, video_infos.created_at))
            info = {
            'id': video_infos.id,
            'title': video_infos.title,
            'url': video_infos.url,
            'thumbnail': video_infos.thumbnail,
            'created_at': video_infos.created_at
            }
            print(info)
        else:
           ValidationError_match = str('メールアドレスもしくはパスワードが間違っています')
           return jsonify(message = ValidationError_match), 400
    return jsonify(list(info.items())), 200 # ログインユーザー情報とユーザーが保持している動画情報をresponseで返す

## ユーザー登録機能
# URLが/registerの時##ログインページ##を表示し、register()関数の処理を行う（通信はget,postメソッド）
@bp.route('/register', methods=['GET', 'POST'])
def register():
    # 書き込まれた項目を取得
    data = request.get_json()
    user_name = data['user_name']
    mail_address = data['mail_address']
    password = data['password']
    # メールアドレスを正規表現で指定
    pattern = "^[a-zA-Z0-9_.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-.]{2,}+$"
    # POSTリクエスト

    if request.method == 'POST':
        # 空欄がある場合
        if user_name == '' or mail_address == '' or password == '':
            ValidationError_form = str('入力されていないフォームがあります')
            return jsonify(message = ValidationError_form), 400
        # メールアドレス形式の不一致
        elif re.match(str(pattern), mail_address) is None:
            ValidationError_mail = str('メールアドレスの形式になっていません')
            return jsonify(message = ValidationError_mail), 400
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
                return jsonify(massage = ValidationError_mail_match), 400
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
    return jsonify(data)

## トップページ
@bp.route('/videoes<int:id>')
@login_required
def top_get_video():
    get_id = User.query.get(id)
    return print(get_id)


# お気に入り登録機能
def favorite_choice():
    if request.method == 'POST':
        request.get_json('')#React側の登録ボタンの変数を入れる
        favorite = Top(
            my_favorite = my_favorite
        )
        try:
        # データベースへの接続を開始（明示的なトランザクションをTrueにする）
            with db.session.begin(subtransactions=True):
            # データベースに書き込むデータを用意する（引数は先ほどのuser）
                db.session.add(favorite)
                # データベースに書き込みを実行する
                db.session.commit()
        # 書き込みがうまくいかない場合
        except:
            # データベースへのお書き込みを行わずロールバック
            db.session.rollback()
        # データベースとの接続を終了
        finally:
            db.session.close()
    return jsonify('my_favorite')
