FROM node:8.7

# Copy source code
ADD ./  /source
WORKDIR /source

# Build install and build
RUN npm install
RUN npm run build              

# Install Nginx depedency 
# and expose port 80
FROM nginx
EXPOSE 80

RUN pwd -a

# Copy /dist resources
ADD ./dist /usr/share/nginx/html

