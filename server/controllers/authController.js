const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Генерація JWT токена
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'your_jwt_secret_key',
    { expiresIn: '1d' }
  );
};

// Реєстрація нового користувача
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Перевірка чи email вже використовується
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Користувач з таким email вже існує' 
      });
    }

    // Створення нового користувача
    const newUser = new User({
      email,
      password
    });

    await newUser.save();

    // Генерація токена
    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      message: 'Користувача успішно зареєстровано',
      token
    });
  } catch (error) {
    console.error('Помилка при реєстрації:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Помилка сервера при реєстрації' 
    });
  }
};

// Логін користувача
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Пошук користувача за email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Невірний email або пароль' 
      });
    }

    // Перевірка пароля
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Невірний email або пароль' 
      });
    }

    // Генерація токена
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Вхід успішний',
      token
    });
  } catch (error) {
    console.error('Помилка при вході:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Помилка сервера при вході' 
    });
  }
};