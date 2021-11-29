FROM node:16.11.1
WORKDIR /usr/app
ADD package*.json ./
RUN npm install -qyg nodemon@2.0.13
RUN npm install
ADD . .
EXPOSE 3000
CMD ["nodemon -L ./server.js"]