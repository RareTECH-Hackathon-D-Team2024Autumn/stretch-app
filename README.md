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

| 言語・フレームワーク | バージョン |
| -------------------- | ---------- |
| Python               | 3.12.7     |
| Flask                | 3.0.3      |
| MySQL                | 8.0        |
| Node.js              | 20.18.0    |
| React                | 18.2.0     |

その他のパッケージのバージョンは pyproject.toml と package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->

-I オプションで除外条件の指定
node_modules を除外
db を除外

❯ tree -I "node_modules|db" -P . -L 4

```plaintext
.
├── README.md
├── .env
├── api
│   └── api.yaml
├── back
│   ├── DB
│   │   ├── Dockerfile
│   │   ├── conf.d
│   │   │   └── my.conf
│   │   └── initdb.d
│   │       └── init.sql
│   ├── Dockerfile
│   ├── __pycache__
│   │   └── setup.cpython-312.pyc
│   ├── app
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-312.pyc
│   │   │   ├── app.cpython-312.pyc
│   │   │   ├── models.cpython-312.pyc
│   │   │   └── views.cpython-312.pyc
│   │   ├── app.py
│   │   ├── models.py
│   │   ├── static
│   │   │   └── css
│   │   ├── templates
│   │   │   ├── _formhelpers.html
│   │   │   ├── base.html
│   │   │   ├── build
│   │   │   ├── home.html
│   │   │   ├── login.html
│   │   │   ├── register.html
│   │   │   ├── top.html
│   │   │   └── user.html
│   │   ├── views.py
│   │   ├── youtube.py
│   │   ├── .env
│   │   ├── .env_example
│   ├── design-document
│   │   └── Hackathon_TeamD.drawio.svg
│   ├── requirements.txt
│   └── scripts
│       └── run.sh
├── compose.yaml
├── debug_text
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
│       ├── src
│       │   ├── App.jsx
│       │   ├── App.test.js
│       │   ├── components
│       │   ├── index.css
│       │   ├── index.js
│       │   ├── logo.svg
│       │   ├── reportWebVitals.js
│       │   ├── setupTests.js
│       │   └── styles
│       └── .env
├── infra_drawing
│   └── Hackathon_TeamD_infra.drawio.svg
└── log
   └── db
```

<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

<!-- コンテナの作成方法、パッケージのインストール方法など、開発環境構築に必要な情報を記載 -->

### コンテナの作成と起動

1. compose.yaml のある階層まで移動

2. docker build コマンドで Docker イメージの作成

   docker compose build

3. Docker コンテナ内でパッケージのインストール

   docker compose run --rm node sh -c "cd app && npm install"

4. docker compose up で Docker コンテナを起動

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
all: すべてのイメージを削除

### 動作確認

バックエンド
http://localhost:5001 にアクセスできるか確認
アクセスできたら成功

フロントエンド
http://localhost:3000 にアクセスできるか確認
アクセスできたら成功

### コンテナの停止

以下のコマンドでコンテナを停止することができます

docker compose stop

## バックエンド（flask）起動方法

### .env ファイルの作成

1. ./stretch-app 内に .env ファイル（DB 用）を作成
   .env ファイルのダウンロード先 → https://chat.raretech.site/d13/pl/oj9jirhbeprixpgf9sysyg6qdy
2. ./stretch_app/back/app 内に .env ファイル（flask 用）を作成
   .env ファイルのダウンロード先 → https://chat.raretech.site/d13/pl/bh7tmnpfjirxprz5qoxyobi13c

### DB の準備

1. docker compose up -d まで実施すると./stretch-app/log/db 内に DB の作成に必要なファイルが作成される
2. docker compose exec db /bin/bash で stretch-app-db コンテナに入る
3. mysql -uroot -p で root ユーザーで MySQL を操作する（パスワード = MYSQL_ROOT_PASSWORD：./stretch-app/.env ファイル参照）
4. show databases; で Stretch_DB がデータベースとして存在するか確認する
5. grant all on Stretch_DB.\* to 'stretch_user'@'%'; で stretch_user に Stretch_DB を使用する権限を付与する
6. exit;
7. mysql -ustretch_user -p で stretch_user で MySQL を操作する（パスワード = MYSQL_PASSWORD：./stretch-app/.env ファイル参照）
8. use Stretch_DB; で使用するデータベースが選択できるか確認し、 show tables; でテーブルが存在するか確認する
9. 問題なければ exit;
10. docker compose down でコンテナを終了後、 docker compose up -d で再度 7, 8 を実施してデータベースとテーブルが問題なければ OK

### フロントエンドとの連携

1.  docker compose up -d まで実施後、 docker compose exec node sh で stretch-app-node コンテナに入る
2.  コンテナ内で cd /app で app ディレクトリに移動し npm run build で build ディレクトリを作成する
3.  exit
4.  ./stretch-app/back/app/内に templates ディレクトリを作成し、先ほどの build ディレクトリを templates ディレクトリ内に移動する（build ディ
    レクトリは./stretch-app/front/app からは削除して問題ありません）
5.  docker compose up で http://localhost:5001/ にアクセスできるか確認する

### 環境変数の一覧

| 変数名              | 役割                                      | デフォルト値 | DEV 環境での値 |
| ------------------- | ----------------------------------------- | ------------ | -------------- |
| MYSQL_ROOT_PASSWORD | MySQL のルートパスワード（Docker で使用） | password     |                |
| MYSQL_DATABASE      | MySQL のデータベース名（Docker で使用）   | db           |                |
| MYSQL_USER          | MySQL のユーザ名（Docker で使用）         | user         |                |
| MYSQL_PASSWORD      | MySQL のパスワード（Docker で使用）       | password     |                |
| MYSQL_HOST          | MySQL のホスト名（Docker で使用）         | db           |                |

## API 仕様書

[Swagger](https://swagger.io/)を使って API の仕様を定義

### 確認方法

1. VS Code の拡張機能[Swagger Viewer](https://marketplace.visualstudio.com/items?itemName=Arjun.swagger-viewer)をインストール

2. VS Code の Preview In Browser を有効にする

3. 「Shift」+「Cmd」+「P」でコマンドパレットを開き PreView Swagger を入力、選択するとブラウザで Viewer が立ち上がり、API 仕様が確認可能

詳細は参考記事を参照

詳細は参考記事を参照

## README 参考記事

[全プロジェクトで重宝されるイケてる README を作成しよう！](https://qiita.com/shun198/items/c983c713452c041ef787)
[OpenAPI・Swagger でインタラクティブな API 仕様ドキュメントを作成する](https://zenn.dev/knm/articles/32106f623bd382)

<p align="right">(<a href="#top">トップへ</a>)</p>
