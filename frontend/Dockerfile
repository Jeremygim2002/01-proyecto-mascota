FROM node:20-bullseye-slim

WORKDIR /home/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Usa un servidor web ligero para servir los archivos
RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-s", "dist"]
