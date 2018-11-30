FROM node:8.7

ADD client /client
#
WORKDIR client

# Install dependencies using npm
RUN npm install

#Build the app
RUN npm run build


FROM nginx

EXPOSE 80

ADD dist/ /usr/share/nginx/html