FROM node:16-alpine

RUN apk add git

RUN mkdir -p /srv/app/money-manager-api

WORKDIR /srv/app/money-manager-api

COPY package*.json ./

COPY decorate-angular-cli.js ./

RUN npm install

RUN npm install pm2 -g

COPY . .

EXPOSE 3333

CMD ["npm", "run", "start:prod"]