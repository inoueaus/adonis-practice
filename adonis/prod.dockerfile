FROM node:14.18.2-alpine AS build

WORKDIR /app

COPY package.json /app/

RUN npm install
RUN npm install -g ace

COPY . /app/

RUN npm run build

FROM node:14.18.2-alpine AS prod

WORKDIR /app

COPY --from=build /app/build /app/

RUN npm ci --production
RUN npm install -g ace

RUN ace run:migration

COPY . /app/

EXPOSE 3333

ENV PORT=3333

CMD ["node", "server.js"]