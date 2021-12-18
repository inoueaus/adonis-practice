FROM node:14.18.2-alpine

WORKDIR /app

COPY package.json /app/

RUN npm install
RUN npm install ace

COPY . /app/

EXPOSE 3333

CMD ["ace", "serve", "--watch"]