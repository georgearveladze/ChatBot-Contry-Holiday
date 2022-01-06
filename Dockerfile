FROM node:alpine3.12

WORKDIR / holidayBot

COPY package*.json ./

RUN npm ci

COPY . . 

CMD [ "node", "index.js" ]