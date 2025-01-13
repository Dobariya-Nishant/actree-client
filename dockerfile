FROM node:22-alpine3.18

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . ./

RUN npm run build

RUN rm -rf node_modules

RUN rm -rf src/

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]