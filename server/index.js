const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

// Завантаження змінних середовища
dotenv.config();

// Ініціалізація Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/auth-service')
  .then(() => console.log('MongoDB підключено'))
  .catch(err => console.error('Помилка підключення до MongoDB:', err));

// Роути
app.use('/api/auth', authRoutes);

// Тестовий роут
app.get('/', (req, res) => {
  res.send('API працює!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});