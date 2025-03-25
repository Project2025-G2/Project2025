const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/v1', (req, res) => {
  res.json({ message: 'Hello from Node.js!' })
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
