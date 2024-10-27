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
│           ├── App.css
│           ├── App.js
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

3. Dockerコンテナ内でReactプロジェクトを作成

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


### コンテナの停止

以下のコマンドでコンテナを停止することができます

docker compose stop

### 環境変数の一覧

| 変数名                 | 役割                                      | デフォルト値                       | DEV 環境での値                           |
| ---------------------- | ----------------------------------------- | ---------------------------------- | ---------------------------------------- |
| MYSQL_ROOT_PASSWORD    | MySQL のルートパスワード（Docker で使用） | password                           |                                          |
| MYSQL_DATABASE         | MySQL のデータベース名（Docker で使用）   | db                                 |                                          |
| MYSQL_USER             | MySQL のユーザ名（Docker で使用）         | user                               |                                          |
| MYSQL_PASSWORD         | MySQL のパスワード（Docker で使用）       | password                           |                                          |
| MYSQL_HOST             | MySQL のホスト名（Docker で使用）         | db                                 |                                          |


## トラブルシューティング

## README参考記事
[全プロジェクトで重宝されるイケてるREADMEを作成しよう！](https://qiita.com/shun198/items/c983c713452c041ef787)


<p align="right">(<a href="#top">トップへ</a>)</p>