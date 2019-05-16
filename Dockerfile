FROM node:10.15

COPY . /app
WORKDIR /app
RUN npm install pm2 -g && npm install && npm run build

CMD pm2 start server.js --no-daemon