FROM node:16-alpine

RUN apk add git

RUN mkdir -p /srv/app/money-manager-api

WORKDIR /srv/app/money-manager-api

COPY package*.json ./

COPY decorate-angular-cli.js ./

# RUN npm install -g @nestjs/cli

# RUN npm install -g nx

RUN npm install

RUN npm install -g pm2

COPY . .

# RUN npm run prebuild

RUN npm run build

EXPOSE 3333

CMD npx prisma migrate deploy && npx prisma generate

ENTRYPOINT ["pm2", "start", ".\dist\apps\api\main.js"]
