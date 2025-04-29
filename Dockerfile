# Базовий образ для клієнта
FROM node:18 as client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client ./
RUN npm run build

# Базовий образ для сервера
FROM node:18 as server
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server ./

# Об'єднуємо клієнт і сервер
FROM node:18
WORKDIR /app
COPY --from=client /app/client/build ./client/build
COPY --from=server /app/server ./
RUN npm install

# Передаємо MONGO_URI як змінну оточення
ARG MONGO_URI
ENV MONGO_URI=${MONGO_URI}

EXPOSE 3000 5000
CMD ["npm", "start"]