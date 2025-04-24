import React, { useState } from 'react';
import '../styles.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage({ text: '', type: '' });
    setEmail('');
    setPassword('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    // Валідація полів
    if (!email || !password) {
      setMessage({ text: 'Будь ласка, заповніть всі поля', type: 'error' });
      return;
    }

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Сталася помилка');
      }

      setMessage({ 
        text: isLogin ? 'Успішний вхід!' : 'Реєстрація успішна!', 
        type: 'success' 
      });
      
      // При успішній авторизації зберігаємо токен
      localStorage.setItem('token', data.token);
      
      // Тут можна додати редирект на головну сторінку
      // window.location.href = '/dashboard';
      
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="form-title">
          {isLogin ? 'Вхід в ' : 'Створення облікового запису в '}
          <strong>[NAME OF SERVICE]</strong>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="randomemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Your password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                👁️
              </button>
            </div>
          </div>
          
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
          
          <button type="submit" className="create-account-btn">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;