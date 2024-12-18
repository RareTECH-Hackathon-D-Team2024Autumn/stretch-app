# データベースとログインマネジャーの用意
from app import db, login_manager

# パスワードのハッシュ化に使用するhashlibのインポート
from flask_bcrypt import generate_password_hash, check_password_hash

# パスワードに付属させるソルトを格納した.envファイルを紐づけるためのpython-dotenvのインポート
# .envファイルのソルト値を変数に格納するためのモジュールのインポート
from dotenv import load_dotenv
import os

# ユーザー認証のためのFlask-LoginのUserMixinをインポート
from flask_login import UserMixin

# データベース関数を使用数際に利用するfunc（名前付きのSQL関数を使用する）をインポート
from sqlalchemy.sql import func

# 外部キーをしようするためのモジュールのインポート
from sqlalchemy import ForeignKey

# 外部キーとのリレーションを行うためのモジュールのインポート
from sqlalchemy.orm import relationship

# データベースでCURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMPを使用するためのモジュールをインポート
from sqlalchemy.sql.expression import text

# .envファイルを呼び出す
load_dotenv('/back/app/.env')
# .envファイル内のペッパー値を変数に代入
PEPPER = os.getenv('PEPPER')

## load_user関数
# デコレーターがFlask_loginライブラリで使用される。ログインマネージャーに関数を登録し、この関数で指定されたユーザーIDに対応するユーザーオブジェクトを返す役割を持つ
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

## Userテーブルの定義
class User(UserMixin, db.Model):
    # テーブル名
    __tablename__ = 'users'

    # カラム定義
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    # user_nameとmail_addressは検索を早くするためにindex=Trueの追加
    user_name = db.Column(db.String(30), index=True, nullable=False)
    mail_address = db.Column(db.String(256), unique=True, index=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    users = relationship('Top', backref='User')

    # Userクラスをインスタンス化して各カラムを引数で使用できるようにしている
    def __init__(self, mail_address, user_name, password):
        self.mail_address = mail_address
        self.user_name = user_name
        # 入力したパスワードとペッパー値を組み合わせたものをハッシュ化する
        self.password = generate_password_hash(password + PEPPER)

    # パスワードにペッパー値を足してハッシュ化したものと、パスワードにペッパー値を足したものを比べ判定している
    def validate_password(self, password):
        password = password + PEPPER
        return check_password_hash(self.password, password)

    # メールアドレスが一意なのかをquery.filter_byメソッドで検索し、一番最初のメールアドレスを取得している。
    @classmethod
    def select_by_mail_address(cls, mail_address):
        return cls.query.filter_by(mail_address=mail_address).first()

# youtube_videosテーブルの作成
class YouTube(UserMixin, db.Model):
    # テーブル名
    __tablename__ = 'youtube_videoes'

    # カラム定義
    id = db.Column(db.Integer, primary_key=True, nullable=False, index=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(100), nullable=False)
    thumbnail = db.Column(db.String(100), nullable=False)
    # DateTimeのデフォルト値をユーザー作成時のサーバーの時刻とする
    created_at = db.Column(db.DateTime, server_default=func.now())
    videoes = relationship('Top', backref='YouTube')

    def __init__(self, title, url, thumbnail):
        self.title = title
        self.url = url
        self.thumbnail = thumbnail


#top_pagesテーブルの作成
class Top(UserMixin, db.Model):
    # テーブル名
    __tablename__ = 'top_pages'

    # カラム定義
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id') ,nullable=False)
    video_id = db.Column(db.Integer, ForeignKey('youtube_videoes.id') ,nullable=False)
    my_favorite = db.Column(db.Boolean, nullable=False)
    # DateTimeのデフォルト値をユーザー作成時のサーバーの時刻とする
    created_at = db.Column(db.DateTime, server_default=func.now())
    # DateTimeのデフォルト値をユーザー作成時のサーバーの時刻とする
    updated_at = db.Column(db.DateTime, server_default=text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

    def __init__(self, user_id, video_id, my_favorite):
        self.user_id = user_id
        self.video_id = video_id
        self.my_favorite = my_favorite

