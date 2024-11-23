from dotenv import load_dotenv
import json
import os
import mysql.connector
import random

load_dotenv('./.env')
DB_USER=os.getenv('DB_USER')
PASSWORD=os.getenv('PASSWORD')
DB_HOST=os.getenv('DB_HOST')
DB_NAME=os.getenv('DB_NAME')
YOUTUBE_API_SERVICE_NAME=os.getenv('YOUTUBE_API_SERVICE_NAME')
YOUTUBE_API_VERSION=os.getenv('YOUTUBE_API_VERSION')
SEARCH_TEXT=os.getenv('SEARCH_TEXT')
PART=os.getenv('PART')
TYPE=os.getenv('TYPE')
VIDEO_DURATION=os.getenv('VIDEO_DURATION')
MAX_RESULTS=os.getenv('MAX_RESULTS')
ORDER=os.getenv('ORDER')
REGION_CODE=os.getenv('REGION_CODE')

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

youtube = build(
    YOUTUBE_API_SERVICE_NAME,
    YOUTUBE_API_VERSION,
    developerKey=API_KEY
)

response = youtube.search().list(
q=SEARCH_TEXT,
part=PART,
type=TYPE,
videoDuration=VIDEO_DURATION,
maxResults=MAX_RESULTS,
order=ORDER,
regionCode=REGION_CODE
).execute()

# 取得した動画をランダムでDBに保管する値を生成
random_number = random.randint(0, 49)

idInfo = response['items'][random_number]['id']
snippetInfo = response['items'][random_number]['snippet']
thumbnailInfo = response['items'][random_number]['snippet']['thumbnails']['default']

# 動画タイトル
title = snippetInfo['title']
# 動画URL
url = ('https://www.youtube.com/watch?v=') + str(idInfo['videoId'])
# サムネイル
thumbnail = (thumbnailInfo['url'])
# データベースにデータをインサート
cursor.execute('INSERT INTO youtube_videoes(title, url, thumbnail) VALUES(%s, %s, %s)',(title, url, thumbnail))
 # データベースにインサートを反映
conn.commit()

# 接続を閉じる
cursor.close()
conn.close()