FROM node:14.17.6-alpine

RUN npm install

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "run", "serve" ]