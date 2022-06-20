FROM node:16-buster-slim

WORKDIR /app

RUN npm i -g npm@latest

ENTRYPOINT  [ "npm" ]