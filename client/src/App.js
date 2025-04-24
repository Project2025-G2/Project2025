import React, { useState } from 'react';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import './styles.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
      <Header toggleForm={toggleForm} isLogin={isLogin} />
      <AuthForm isInitialLogin={isLogin} />
      <div className="footer">
        ©FSI-33 Team B, 2025
      </div>
    </div>
  );
}

export default App;