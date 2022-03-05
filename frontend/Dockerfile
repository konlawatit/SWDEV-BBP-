FROM node:16.14-alpine

WORKDIR /usr/app/frontend

# Install PM2 globally
# RUN yarn add pm2

COPY ./package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["npm", "start"]