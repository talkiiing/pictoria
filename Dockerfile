FROM node:17.0.1-buster

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY ./ ./

CMD ["npm", "start"]
