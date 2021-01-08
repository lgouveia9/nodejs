FROM node:alpine

WORKDIR /root/neo_nginx/nodejs

COPY package*.json ./
RUN npm install express
RUN npm install

COPY . .

EXPOSE 3800

CMD ["npm","start"]