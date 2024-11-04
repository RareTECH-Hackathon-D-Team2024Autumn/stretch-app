## モジュールのインポート

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

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
    app = Flask(__name__)

    # SECRET_KEYの定義
    app.config['SECRET_KEY'] = 'mystretch'
    # MySQLとの接続設定（mysqlclientを使用した設定{ユーザー、パスワード、ホスト名、使用するDB名}）
    app.config['SQLALCHEMY_DATABASE_URI'] = \
        'mysql://{user}:{password}@{host}/{db_name}?charset=utf8'.format(**{
        'user': "stretch_user",
        'password': "stretch_MySQL",
        'host': 'localhost',
        'db_name': "Stretch_DB"
        })
    # メモリを消費しないためFalseに設定
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    ## 初期設定

    # view.pyで記述するBlueprintの設定（Blueprintのインポート）
    from stretch_app.views import bp
    # FlaskアプリでBlueprintを使用できる様にしている
    app.register_blueprint(bp)
    # FlaskアプリでMySQLを使用できる様にしている
    db.init_app(app)
    # Flaskアプリでmigrateを使用して、MySQLのテーブル作成や更新ができる様にしている。
    migrate.init_app(app, db)
    # FlaskアプリでLoginManagerを使用できる様にしている。
    login_manager.init_app(app)
    return app