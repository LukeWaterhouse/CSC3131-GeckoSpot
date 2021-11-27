FROM node:16.11.1

WORKDIR /usr/app

COPY --from=build package*.json ./

RUN npm install -qy

COPY . .

CMD ["npm", "run", "dev"]
