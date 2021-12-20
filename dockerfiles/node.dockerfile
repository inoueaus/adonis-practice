FROM node:14.18.2-alpine

WORKDIR /app

RUN npm install

RUN npm install ace
