FROM node:20-bullseye-slim

WORKDIR /home/app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "server.mjs"]
