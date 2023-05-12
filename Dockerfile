FROM node:18-alpine AS builder

WORKDIR /var/www/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /var/www/production

COPY --from=builder /var/www/app/package.json /var/www/app/package-lock.json ./

RUN npm install --omit=dev

COPY --from=builder /var/www/app/dist ./dist
COPY --from=builder /var/www/app/server.ts ./

EXPOSE 3000

CMD ["node", "./server.ts"]
