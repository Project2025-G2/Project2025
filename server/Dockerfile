# Вибираємо базовий образ Node.js
FROM node:18

# Встановлюємо робочу директорію в контейнері
WORKDIR /app

# Копіюємо package.json та package-lock.json для встановлення залежностей
COPY package.json package-lock.json ./

# Встановлюємо всі залежності
RUN npm install

# Копіюємо весь код серверу в контейнер
COPY . .

# Вказуємо порт, на якому сервер працюватиме
EXPOSE 5000

# Команда для запуску сервера
CMD ["npm", "start"]
