import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., user@example.com)';
    }

    // Password validation with more specific messages
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
      }
      if (!/\d/.test(formData.password)) {
        newErrors.password = (newErrors.password || '') + '\nPassword must contain at least one number';
      }
      if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = (newErrors.password || '') + '\nPassword must contain at least one uppercase letter';
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'The passwords you entered do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email: formData.email,
        password: formData.password,
      });

      console.log('Registration successful:', response.data);
      // Navigate to home page after successful registration
      navigate('/');
    } catch (err) {
      console.error('Registration error details:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });

      let errorMessage = '';
      
      // Check for specific error conditions
      if (err.response?.data?.error === 'USER_EXISTS' || 
          (err.response?.data?.message && err.response?.data?.message.includes('exists'))) {
        errorMessage = 'An account with this email already exists.';
      } else if (err.response?.status === 400) {
        errorMessage = 'Invalid input. Please check your details and try again.';
      } else if (!navigator.onLine) {
        errorMessage = 'No internet connection. Please check your network.';
      } else {
        errorMessage = 'Registration failed. Please try again later.';
      }

      setErrors({
        submit: errorMessage
      });
    }
  };

  return (
    <div className="register-page">
      <Header />
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
          {errors.submit && <div className="error">{errors.submit}</div>}
          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
