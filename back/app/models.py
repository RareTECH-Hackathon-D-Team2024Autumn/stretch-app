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

# .envファイルを呼び出す
load_dotenv('/back/.env')
# .envファイル内のソルト値を変数に代入
SALT = os.getenv('SALT')

## load_user関数
# デコレーターがFlask_loginライブラリで使用される。ログインマネージャーに関数を登録し、この関数で指定されたユーザーIDに対応するユーザーオブジェクトを返す役割を持つ
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

## Userテーブルの定義
class User(UserMixin, db.Model):
    # テーブル名
    __tablename__ = 'Users'

    # カラム定義
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    # user_nameとmail_addressは検索を早くするためにindex=Trueの追加
    user_name = db.Column(db.String(30), index=True, nullable=False)
    mail_address = db.Column(db.String(256), unique=True, index=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    # DateTimeのデフォルト値をユーザー作成時のサーバーの時刻とする
    created_at = db.Column(db.DateTime, server_default=func.now())
     # DateTimeのデフォルト値をユーザー作成時のサーバーの時刻とする
    updated_at = db.Column(db.DateTime, server_default=func.now())

    # Userクラスをインスタンス化して各カラムを引数で使用できるようにしている
    def __init__(self, mail_address, user_name, password):
        self.mail_address = mail_address
        self.user_name = user_name
        # 入力したパスワードとソルト値を組み合わせたものをハッシュ化する
        self.password = generate_password_hash(password + SALT)

    # パスワードにソルト値を足してハッシュ化したものと、パスワードにソルト値を足したものを比べ判定している
    def validate_password(self, password):
        password = password + SALT
        return check_password_hash(self.password, password)

    # メールアドレスが一意なのかをquery.filter_byメソッドで検索し、一番最初のメールアドレスを取得している。
    @classmethod
    def select_by_mail_address(cls, mail_address):
        return cls.query.filter_by(mail_address=mail_address).first()



