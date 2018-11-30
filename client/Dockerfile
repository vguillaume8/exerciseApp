FROM node:8.7

# Copy source code
ADD ./  /source
WORKDIR /source

# Build install and build
RUN npm install
RUN npm install -g serve
RUN npm run build       

WORKDIR dist

EXPOSE 5000

CMD serve


