<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <!-- バックエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Flask-000000.svg?logo=Flask&style=for-the-badge">
  <!-- バックエンドの言語一覧 -->
  <img src="https://img.shields.io/badge/-Python-F2C63C.svg?logo=python&style=for-the-badge">
  <!-- ミドルウェア一覧 -->
  <img src="https://img.shields.io/badge/-MySQL-4479A1.svg?logo=mysql&style=for-the-badge&logoColor=white">
  <!-- インフラ一覧 -->
  <img src="https://img.shields.io/badge/-Docker-1488C6.svg?logo=docker&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Amazon%20aws-232F3E.svg?logo=amazon-aws&style=for-the-badge">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)
5. [トラブルシューティング](#トラブルシューティング)

<!-- READMEの作成方法のドキュメントのリンク -->

<!-- Dockerfileのドキュメントのリンク -->

<!-- プロジェクト名を記載 -->

## プロジェクト名


<!-- プロジェクトについて -->

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク     | バージョン |
| --------------------- | ---------- |
| Python                | 3.12.7     |
| Flask                 | 3.0.3      |
| MySQL                 | 8.0        |
| Node.js               | 20.18.0    |
| React                 | 18.2.0     |

その他のパッケージのバージョンは pyproject.toml と package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->
-Iオプションで除外条件の指定
node_modulesを除外

❯ tree  -I "node_modules" -L 4

```plaintext
.
├── README.md
├── .env
├── .gitignore
├── api
│   ├──compose.yaml
├── back
│   ├── DB
│   │   ├── Dockerfile
│   │   ├── conf.d
│   │   │   └── my.conf
│   │   └── initdb.d
│   │       └── init.sql
│   ├── Dockerfile
│   ├── app
│   │   ├── __pycache__
│   │   │   └── app.cpython-312.pyc
│   │   └── app.py
│   ├── requirements.txt
│   └── scripts
│       └── run.sh
├── compose.yaml
├── front
│   ├── Dockerfile
│   └── app
│       ├── README.md
│       ├── package-lock.json
│       ├── package.json
│       ├── public
│       │   ├── favicon.ico
│       │   ├── index.html
│       │   ├── logo192.png
│       │   ├── logo512.png
│       │   ├── manifest.json
│       │   └── robots.txt
│       └── src
│           ├── components
│           │   ├── Login.jsx
│           │   ├── Signup.jsx
│           ├── styles
│           │   ├── Login.css
│           │   ├── Signup.css
│           ├── App.jsx
│           ├── App.test.js
│           ├── index.css
│           ├── index.js
│           ├── logo.svg
│           ├── reportWebVitals.js
│           └── setupTests.js
└── log
    └── db
```

<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

<!-- コンテナの作成方法、パッケージのインストール方法など、開発環境構築に必要な情報を記載 -->

### コンテナの作成と起動

1. compose.yamlのある階層まで移動

2. docker buildコマンドで Dockerイメージの作成

   docker compose build

3. Dockerコンテナ内でパッケージのインストール

   docker compose run --rm node sh -c "cd app && npm install"

4. docker compose upでDockerコンテナを起動

   docker compose up -d

   -d: コンテナをバックグラウンドで実行させる
       付与しないとフォアグラウンドで実行されて、コンテナのログが画面上に出力され、ターミナル上で続けてコマンドを打てなくなる

5. 確認できたら、コンテナを停止させる

   docker compose stop

6. 再び起動させる

   docker compose start

※ コンテナを削除するコマンド

   docker compose down --rmi all

   --rmi: イメージも同時に削除
   all: 全てのイメージを削除

### 動作確認

バックエンド
http://localhost:5001 にアクセスできるか確認
アクセスできたら成功

フロントエンド
http://localhost:3000 にアクセスできるか確認
アクセスできたら成功

データベース
1. stretch-appディレクトリにて、docker compose up -d の実行

2. docker psを実行し、mysql_dbが起動しているか確認

3. docker exec -it mysql_db bashを実行し、Dockerにログイン

4. mysql -u root -pなどでユーザーを指定し、パスワードを入力してMySQLへログイン

5. MySQLはquit; Dockerはexitで終了

### コンテナの停止

以下のコマンドでコンテナを停止することができます

docker compose stop

### バックエンド（flask）起動方法
./.env_exampleに記載

### 環境変数の一覧

| 変数名                 | 役割                                      | デフォルト値                       | DEV 環境での値                           |
| ---------------------- | ----------------------------------------- | ---------------------------------- | ---------------------------------------- |
| MYSQL_ROOT_PASSWORD    | MySQL のルートパスワード（Docker で使用） | password                           |                                          |
| MYSQL_DATABASE         | MySQL のデータベース名（Docker で使用）   | db                                 |                                          |
| MYSQL_USER             | MySQL のユーザ名（Docker で使用）         | user                               |                                          |
| MYSQL_PASSWORD         | MySQL のパスワード（Docker で使用）       | password                           |                                          |
| MYSQL_HOST             | MySQL のホスト名（Docker で使用）         | db                                 |                                          |
| SECRET_KEY             | シークレットキー(flask で使用)　　　　　　　 | 任意のシークレットキー（例：test）       | back/app/__init__.pyで使用　　　　　　　　　 |
| DB_USER                |　MySQL にログインするユーザー名（flask で使用）| 任意のMySQLのユーザー名（例：test）　　| back/app/__init__.pyで使用                |
| PASSWORD               |　MySQL にログインするユーザーのパスワード（flask で使用）| 任意のMySQLユーザーのパスワード（例：test）　| back/app/__init__.pyで使用   |
| DB_HOST                |　Dockerの MySQLコンテナホスト名（flaskで使用）| db　　　　　　　　　　　　            | back/app/__init__.pyで使用                |
| DB_NAME                |　使用するDB名                             | 任意のDB名（例：test）　　　　　　　　　 | back/app/__init__.pyで使用                |
| DEBUG                  |　デバック機能を有効化（flaskで使用）          | True                               | back/app/app.pyで使用                     |
| DEBUG_NULL             |　デバック機能を無効化（flaskで使用）          | False                              | back/app/app.pyで使用                     |
| HOST                   |　起動アドレス番号                           | 0.0.0.0                            | back/app/app.pyで使用                     |
| PORT                   |　起動ポート番号                             | 5000                               | back/app/app.pyで使用                     |
## API仕様書

[Swagger](https://swagger.io/)を使ってAPIの仕様を定義

### 確認方法

1. VS Codeの拡張機能[Swagger Viewer](https://marketplace.visualstudio.com/items?itemName=Arjun.swagger-viewer)をインストール

2. VS CodeのPreview In Browserを有効にする

3. 「Shift」+「Cmd」+「P」でコマンドパレットを開きPreView Swaggerを入力、選択するとブラウザでViewerが立ち上がり、API仕様が確認可能

詳細は参考記事を参照

## API仕様書

[Swagger](https://swagger.io/)を使ってAPIの仕様を定義

### 確認方法

1. VS Codeの拡張機能[Swagger Viewer](https://marketplace.visualstudio.com/items?itemName=Arjun.swagger-viewer)をインストール

2. VS Codeの設定から「Preview In Browser」を検索し、確認後有効にする

3. 「Shift」+「Cmd」+「P」でコマンドパレットを開きPreView Swaggerを入力、選択するとブラウザでViewerが立ち上がり、API仕様が確認可能

詳細は参考記事を参照

## トラブルシューティング

## README参考記事

[全プロジェクトで重宝されるイケてるREADMEを作成しよう！](https://qiita.com/shun198/items/c983c713452c041ef787)
[OpenAPI・Swaggerでインタラクティブな API 仕様ドキュメントを作成する](https://zenn.dev/knm/articles/32106f623bd382)

<p align="right">(<a href="#top">トップへ</a>)</p>
