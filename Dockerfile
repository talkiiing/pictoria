FROM node:17.0.1-buster

WORKDIR /usr/src/app
#
#RUN apk add --update --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/community --repository http://dl-3.alpinelinux.org/alpine/edge/main vips-dev
#
#RUN apk add --update --no-cache binutils
#RUN apk add --update --no-cache build-base

COPY package*.json .

RUN npm cache clean --force
RUN npm ci

#RUN npm install --platform=linux --arch=x64 sharp

COPY . .

CMD ["npm", "start"]
