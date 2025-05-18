# client/Dockerfile

# —————— 1) BUILD Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build

# —————— 2) PROD Stage — serve
FROM node:20-alpine AS prod
WORKDIR /app
# встановлюємо глобально serve
RUN npm install -g serve
# копіюємо тільки готову збірку
COPY --from=builder /app/build ./build
EXPOSE 3000
# запускаємо статику на 3000-му порту
CMD ["serve", "-s", "build", "-l", "3000"]
