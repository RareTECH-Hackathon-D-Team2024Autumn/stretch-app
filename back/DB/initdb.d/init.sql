-- データベースの初期化
DROP DATABASE IF EXISTS Stretch_DB;

-- データベースの作成
CREATE DATABASE  Stretch_DB COLLATE utf8mb4_unicode_ci;

-- データベースの使用
USE Stretch_DB;

-- usersテーブルの作成
CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(30) NOT NULL,
    mail_address VARCHAR(256) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    INDEX (user_name, mail_address)
);

-- youtube_videoesテーブルの作成
CREATE TABLE IF NOT EXISTS youtube_videoes(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    url VARCHAR(100) NOT NULL,
    thumbnail VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX(id)
);

-- top_pagesテーブルの作成
CREATE TABLE IF NOT EXISTS top_pages(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    video_id INT NOT NULL,
    my_favorite BOOLEAN,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (video_id) REFERENCES youtube_videoes(id)
);

-- usersテーブルにデフォルトのユーザーを追加
INSERT INTO users VALUES
    (1, "test", "test@email.com", "$2b$12$M1OvmHoZdQLNJb7ZtMqkdeMSug.xB8iWVumWRFyFnyYDJHa3Ouvz6"),
    (2, "user", "user@email.com", "$2b$12$FUGEczQ5bZ5q2CK.zxV1EuHnnBnTOM3W7bYo5b1dK.8Q7Y7.vvT1O"),
    (3, "hoge", "hoge@email.com", "$2b$12$tbuhZZTP5/2B89XKbadQOu6svVDp5YJtnfZY7HIJDDdmw1jGgQro6");

-- youtube_videoesテーブルにデフォルトの動画情報を追加
INSERT INTO youtube_videoes VALUES
    (1, "【腰痛軽減】2分間の腰伸ばしストレッチ（キャットアンドドッグ、姿勢改善 ", "https://www.youtube.com/watch?v=eQ03wzDG0wo", "https://i.ytimg.com/vi/eQ03wzDG0wo/default.jpg", "2024-10-01 06:01:15"),
    (2, " コレ太るから絶対やめて！ #股関節ストレッチ ＃ダイエット＃美容 ", "https://www.youtube.com/watch?v=AimExuYhS_o", "https://i.ytimg.com/vi/AimExuYhS_o/default.jpg", "2024-10-02 06:01:38"),
    (3, "【死ぬほど巻き肩治る】20秒の肩甲骨ストレッチでストレートネック・巻き肩を解消する方法！#shorts ", "https://www.youtube.com/watch?v=Upa9pi45ugc", "https://i.ytimg.com/vi/Upa9pi45ugc/default.jpg", "2024-10-03 06:01:03"),
    (4, " 腰痛15秒ストレッチ #腰痛 #ストレッチ #整体 #腰痛専門 ",  "https://www.youtube.com/watch?v=QvZVSlBnUJo", "https://i.ytimg.com/vi/QvZVSlBnUJo/default.jpg", "2024-10-04 06:02:32"),
    (5, "【医師監修！肩こり解消】座ってできる3分ストレッチ ", "https://www.youtube.com/watch?v=NwleJdbAxCs", "https://i.ytimg.com/vi/NwleJdbAxCs/default.jpg", "2024-10-05 06:01:04"),
    (6, " 巻き肩さん、30秒で速攻改善ストレッチだよ！ ",  "https://www.youtube.com/watch?v=Y7177dPkrSE", "https://i.ytimg.com/vi/Y7177dPkrSE/default.jpg", "2024-10-06 06:02:11"),
    (7, " 巻き肩はぶっちゃけ簡単！ #shorts ",  "https://www.youtube.com/watch?v=bA2xlC_pTTU", "https://i.ytimg.com/vi/bA2xlC_pTTU/default.jpg", "2024-10-01 07:00:59");


-- top_pagesテーブルにデフォルトのuser_id（ユーザー3名）とvideo_id（動画7本分）を追加
INSERT INTO top_pages VALUES
    (1, 1, 1, 0, now(), now()),
    (2, 1, 2, 0, now(), now()),
    (3, 1, 3, 0, now(), now()),
    (4, 1, 4, 0, now(), now()),
    (5, 1, 5, 0, now(), now()),
    (6, 1, 6, 0, now(), now()),
    (7, 1, 7, 0, now(), now()),
    (8, 2, 1, 0, now(), now()),
    (9, 2, 2, 0, now(), now()),
    (10, 2, 3, 0, now(), now()),
    (11, 2, 4, 0, now(), now()),
    (12, 2, 5, 0, now(), now()),
    (13, 2, 6, 0, now(), now()),
    (14, 2, 7, 0, now(), now()),
    (15, 3, 1, 0, now(), now()),
    (16, 3, 2, 0, now(), now()),
    (17, 3, 3, 0, now(), now()),
    (18, 3, 4, 0, now(), now()),
    (19, 3, 5, 0, now(), now()),
    (20, 3, 6, 0, now(), now()),
    (21, 3, 7, 0, now(), now());