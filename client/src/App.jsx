import React, { useEffect, useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'    // скоригуйте шлях залежно від вашої структури

function App () {
  const [message, setMessage] = useState('')

  useEffect(() => {
      fetch('/api/v1')
      .then(res => res.json())
      .then(data => setMessage(data.message))
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App
