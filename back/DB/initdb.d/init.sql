-- データベースの初期化
DROP DATABASE IF EXISTS hogushi_no;

-- データベースの作成
CREATE DATABASE  hogushi_no COLLATE utf8mb4_unicode_ci;

-- データベースの使用
USE hogushi_no;

-- usersテーブルの作成
CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY NOT NULL,
    user_name VARCHAR(30) NOT NULL,
    mail_address VARCHAR(256) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL
);

-- youtube_videoesテーブルの作成
CREATE TABLE IF NOT EXISTS youtube_videoes(
    id INT PRIMARY KEY NOT NULL,
    item VARCHAR(1000) NOT NULL,
    title VARCHAR(100), NOT NULL,
    url VARCHAR(100) NOT NULL,
    thumbnail VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- top_pagesテーブルの作成
CREATE TABLE IF NOT EXISTS top_pages(
    id INT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    video_id INT NOT NULL,
    my_favorite BOOLEAN DEFAULT FALSE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (video_id) REFERENCES youtube_videoes(id)
);