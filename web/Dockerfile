FROM node:14-buster

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install
COPY . .

ENTRYPOINT yarn start