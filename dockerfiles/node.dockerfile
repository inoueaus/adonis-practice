FROM node:14.18.2-alpine

WORKDIR /app

COPY /adonis/package.json /app/

RUN npm install

RUN npm install ace
