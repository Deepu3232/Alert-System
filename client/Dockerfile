FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install --verbose

RUN npm i serve -g

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]