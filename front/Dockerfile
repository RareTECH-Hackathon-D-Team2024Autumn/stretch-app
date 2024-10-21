# dockerHubから持ってくるImageの指定3
FROM node:20.18.0-alpine3.20

# 使用するnodeのバージョンの指定
ENV NODE_VERSION 20.18.0
# docker内に入った時の初期パスの指定
WORKDIR /front
# ローカル側のファイルをdocker内にコピーする
# COPY ./react /front
RUN npm install -g create-react-app
# COPY ./scripts /front
# コンテナの使用ポート指定
EXPOSE 3000
# コンテナが勝手に終了してしまわないようにする設定
ENV CI=true

# CMD npm start
