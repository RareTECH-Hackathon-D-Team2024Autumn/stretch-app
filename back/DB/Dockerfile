FROM mysql:8.0-debian

# RUN touch /var/log/mysql/mysqld.log

# Set Japanese
RUN apt update \
    && apt install -y locales \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

RUN sed -i -E 's/# (ja_JP.UTF-8)/\1/' /etc/locale.gen\
    && locale-gen
    
ENV LANG ja_JP.UTF-8

# CMD ["flask", "run", "--host=0.0.0.0"]
CMD ["mysqld", "--character-set-server=utf8", "--collation-server=utf8_unicode_ci"]
