FROM node:14.18.2-alpine AS build

WORKDIR /app

COPY package.json /app/

RUN npm install
RUN npm install -g ace

COPY . /app/

RUN npm run build

FROM node:14.18.2-alpine AS runner

WORKDIR /app

COPY --from=build /app/build /app/
COPY .env /app/

RUN npm ci --production
RUN npm install -g ace

EXPOSE 80

ENV PORT=80
ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV APP_KEY=wKJB-3Q-CdYyC0x8bYP8hJIFMWMP6B__
ENV DRIVE_DISK=local
ENV DB_CONNECTION=pg
ENV PG_HOST=db
ENV PG_PORT=5432
ENV PG_USER=lucid
ENV PG_PASSWORD=secret
ENV PG_DB_NAME=lucid
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379

CMD ["npm", "run", "start"]