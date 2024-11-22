## モジュールのインポート

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from dotenv import load_dotenv
from flask_cors import CORS # Reactと接続するためのモジュールをインポート
import os

# .envファイルの取り込み
# .envファイル内の環境変数を定義する
load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
DB_USER= os.getenv('DB_USER')
PASSWORD = os.getenv('PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')

# インポートしたflask_loginのLoginManagerのクラスをインスタンス化
login_manager = LoginManager()
# ログインしていないユーザーがログイン画面以外（トップページ等）を見ようとした時以外にstretch-app.login(/login)へ遷移させる
login_manager.login_view = 'stretch_app.login'
# loginviewメソッドが実行されると表示されるメッセージをlogin_messageメソッドに定義
login_manager.login_message = 'ログインして下さい'

# インポートしたSQLAlchemy、Migrateクラスをインスタンス化
db = SQLAlchemy()
migrate = Migrate()

## create_app関数を作成

def create_app():
    # Flask自体をappという名前でインスタンス化し、returnで返す
    app = Flask(__name__, template_folder='./templates/build/', static_folder='./templates/build/static/')

    # SECRET_KEYの定義
    app.config['SECRET_KEY'] = SECRET_KEY
    # MySQLとの接続設定（mysqlclientを使用した設定{ユーザー、パスワード、ホスト名、使用するDB名}）
    app.config['SQLALCHEMY_DATABASE_URI'] = \
        'mysql://{user}:{password}@{host}/{db_name}?charset=utf8'.format(**{
        'user': DB_USER,
        'password': PASSWORD,
        'host': DB_HOST,
        'db_name': DB_NAME
        })
    # メモリを消費しないためFalseに設定
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    ## 初期設定
    # 全てのオリジンからアクセスを許可
    #CORS(app, resources={r"/*": {"origins":["http://127.0.0.1:3000", "http://127.0.0.1:5001"]}})
    CORS(app)
    # view.pyで記述するBlueprintの設定（Blueprintのインポート）
    from .views import bp
    # FlaskアプリでBlueprintを使用できる様にしている
    app.register_blueprint(bp)
    # FlaskアプリでMySQLを使用できる様にしている
    db.init_app(app)
    # Flaskアプリでmigrateを使用して、MySQLのテーブル作成や更新ができる様にしている。
    migrate.init_app(app, db)
    # FlaskアプリでLoginManagerを使用できる様にしている。
    login_manager.init_app(app)
    return app