import React, { useEffect, useState } from 'react'

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
