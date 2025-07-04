FROM node:20-bullseye-slim

WORKDIR /home/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 5175

CMD ["serve", "-l", "5175", "-s", "dist"]
