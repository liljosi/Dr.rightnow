FROM node:6.9.4

WORKDIR /usr/app

COPY package.json .
RUN npm install 

COPY . .
