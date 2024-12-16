FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm rebuild sqlite3 --build-from-source
EXPOSE 4002
CMD ["node", "server.js"]
