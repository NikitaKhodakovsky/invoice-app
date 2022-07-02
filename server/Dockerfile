FROM node:18.4.0-alpine as build 

WORKDIR /app

COPY package*.json .npmrc ./

RUN npm i &> /dev/null

COPY . .

RUN npm run build 

FROM node:18.4.0-alpine as production 

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json .npmrc ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]