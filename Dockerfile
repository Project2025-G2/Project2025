# Базовий образ
FROM node:18

# Встановимо робочу директорію
WORKDIR /app

# Встановимо глобально concurrently
RUN npm install -g concurrently

# Скопіюємо package.json з обох проєктів
COPY client/package*.json ./client/
COPY server/package*.json ./server/
COPY package*.json ./

# Встановимо залежності для клієнта
WORKDIR /app/client
RUN npm install

# Встановимо залежності для сервера
WORKDIR /app/server
RUN npm install

# Скопіюємо увесь код в контейнер
COPY . .

# Експортуємо порти
EXPOSE 3000 5000

# Запускаємо dev-сервер клієнта і сервера одночасно
CMD ["concurrently", "npm run start-client", "npm run start-server"]
