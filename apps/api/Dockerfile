FROM node:16-alpine

RUN apk add git

RUN mkdir -p /srv/app/money-manager-api

WORKDIR /srv/app/money-manager-api

COPY package*.json ./

COPY decorate-angular-cli.js ./

RUN npm install

RUN npm install pm2 -g

COPY . .

RUN npx nx build api --configuration=production

EXPOSE 3333

CMD npx prisma migrate deploy && npx prisma generate && pm2-runtime start ".\dist\apps\api\main.js"