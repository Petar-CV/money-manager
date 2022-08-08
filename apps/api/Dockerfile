FROM node:16-alpine

RUN apk add git

RUN mkdir -p /srv/app/money-manager-api

WORKDIR /srv/app/money-manager-api

COPY package*.json ./

COPY decorate-angular-cli.js ./

# RUN npm install -g @nestjs/cli

# RUN npm install -g nx

RUN npm install

COPY . .

RUN npx prisma migrate deploy

RUN npx prisma generate

# RUN npm run prebuild

RUN npm run build

EXPOSE 3333

ENTRYPOINT ["npm", "run", "start:prod"]
