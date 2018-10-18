FROM node:8.7

ADD /  /app



WORKDIR  app

RUN npm install

CMD node app.js

RUN npm start

EXPOSE 80