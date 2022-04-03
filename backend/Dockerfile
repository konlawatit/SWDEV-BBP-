FROM node:16.13.0-alpine

WORKDIR /usr/app/backend

COPY ./package.json .

RUN yarn install

COPY . .

CMD ["yarn", "run", "start"]

