FROM node:18.17.1-alpine3.17

ENV PORT 5050

WORKDIR /app

COPY package.json.hbs package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

CMD npm run dev

EXPOSE $PORT
