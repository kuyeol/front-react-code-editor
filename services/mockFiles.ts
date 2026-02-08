
export const APP_PY = `from flask import Flask, jsonify, request
import os
import redis

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.Exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1`;

export const MODELS_PY = `from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'`;


export const HELLO_JAVA = `package org.acme;

public class Hello {

public void main(String... args){
System.out.println("Hello World");
}
}`;

export const DOCKER_COMPOSE_YML = `version: '3.9'
services:
  web:
    build: .
    ports:
      - '8080:5000'
    volumes:
      - .:/app
  redis:
    image: 'redis:alpine'`;

export const DOCKERFILE = `FROM python:3.10-alpine
WORKDIR /app
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]`;

export const DOT_ENV = `DEBUG=True
REDIS_HOST=localhost
DATABASE_URL=postgresql://user:pass@db:5432/myapp`;

export const MOCK_FILES_MAP: Record<string, string> = {
  'app.py': APP_PY,
  'models.py': MODELS_PY,
  'Hello.java': HELLO_JAVA,
  'docker-compose.yml': DOCKER_COMPOSE_YML,
  'Dockerfile': DOCKERFILE,
  '.env': DOT_ENV,
};
