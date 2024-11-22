FROM python:3.12.7

RUN apt update \
    && apt install -y default-mysql-client \
    && apt install --no-install-recommends -y tzdata \
    && apt clean

WORKDIR /usr/src/app

ENV FLASK_APP=app

COPY requirements.txt .

# COPY /scripts/run.sh /usr/src/scripts/run.sh
# RUN chmod +x /usr/src/scripts/run.sh

# RUN pip install flask
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# COPY ./app /usr/src

# コンテナの使用ポート指定
EXPOSE 5001

CMD [ "flask", "run", "--host=0.0.0.0" ]

