FROM node:16.13.0-alpine

WORKDIR /usr/app/frontend

# Install PM2 globally
# RUN yarn add pm2

COPY ./package.json .

# COPY yarn.lock .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
