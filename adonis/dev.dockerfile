FROM node:14.18.2-alpine

WORKDIR /app

COPY package.json /app/

RUN npm install
RUN npm install -g ace

RUN ace run:migration

COPY . /app/

EXPOSE 3333

CMD ["ace", "serve", "--watch"]