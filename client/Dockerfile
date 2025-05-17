# client/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

# 1) кешуємо залежності
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# 2) збірка React
COPY . .
RUN npm run build

# 3) оголошуємо каталог зі статикою як VOLUME,
#    щоб його вміст потрапив у named volume
VOLUME ["/app/build"]
