## Docker Support for the bot

FROM python:3.10-slim-buster

RUN apt update && apt upgrade -y
RUN pip3 install -U pip

RUN mkdir /app/
WORKDIR /app/
RUN chmod 777 /app/
COPY requirements.txt /app/
RUN pip3 install -U -r requirements.txt
COPY . /app/
EXPOSE 8000

CMD ["python3", "bot.py"]