FROM node:8.7

#
WORKDIR /client

# Install dependencies using npm
RUN npm install

#Build the app
RUN npm run build


FROM nginx

EXPOSE 8080

ADD _dist/ /usr/share/nginx/html