from dotenv import load_dotenv
import json
import os
import mysql.connector

load_dotenv('./.env')
DB_USER=os.getenv('DB_USER')
PASSWORD=os.getenv('PASSWORD')
DB_HOST=os.getenv('DB_HOST')
DB_NAME=os.getenv('DB_NAME')

# MySQLに接続
conn = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=PASSWORD,
    db=DB_NAME
)

cursor = conn.cursor()

load_dotenv('./.env')
API_KEY = os.getenv('API_KEY')

from googleapiclient.discovery import build

API_KEY
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'
SEARCH_TEXT = 'ストレッチ'

youtube = build(
    YOUTUBE_API_SERVICE_NAME,
    YOUTUBE_API_VERSION,
    developerKey=API_KEY
)

response = youtube.search().list(
 # 検索キーワード
q=SEARCH_TEXT,
# 出力する動画のID情報と動画の中身をidとsnippetに区別
part='id,snippet',
# 動画のみ検索
type='video',
# 4分以下の動画を検索
videoDuration='short',
# 検索する動画数を指定
maxResults=5,
# 評価が高い動画を指定
order='rating',
# 日本の動画を指定
regionCode='JP'
).execute()

idInfo = response['items'][0]['id']
snippetInfo = response['items'][0]['snippet']
thumbnailInfo = response['items'][0]['snippet']['thumbnails']['default']

# 動画タイトル
title = snippetInfo['title']
# 動画URL
url = ('https://www.youtube.com/watch?v=') + str(idInfo['videoId'])
# サムネイル
thumbnail = (thumbnailInfo['url'])
# ファイル出力データの変数化
item = title + ('\n') + url + ('\n') + thumbnail

# ファイルに整形してデータを出力
#with open('youtube_information.txt', 'w', encoding='utf-8') as f:
#    print(item, file=f)

# データベースにデータをインサート
#with open('youtube_information.txt', 'r', encoding='utf-8') as f:
# idをfor文にして
cursor.execute('INSERT INTO youtube_videoes(id, item, title, url, thumbnail) VALUES(1, %s, %s, %s, %s)',(item, title, url, thumbnail))

conn.commit()
# 接続を閉じる
cursor.close()
conn.close()