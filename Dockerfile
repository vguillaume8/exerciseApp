FROM node:8.7

ADD /  /app



WORKDIR  app

RUN npm install

CMD npm start

EXPOSE 80