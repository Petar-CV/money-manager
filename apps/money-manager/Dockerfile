FROM node:16-alpine AS builder

RUN mkdir -p /usr/src/app/money-manager-frontend
WORKDIR /usr/src/app/money-manager-frontend

# RUN apk --update add git

COPY package*.json ./

COPY decorate-angular-cli.js ./

RUN npm install

COPY . .

RUN npx nx build money-manager --configuration=production

# Stage 2
FROM nginx:1.23.1-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/src/app/money-manager-frontend/dist/apps/money-manager .

COPY ./apps/money-manager/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

