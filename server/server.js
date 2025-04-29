const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const PORT = 5000


dotenv.config({ path: __dirname + '/.env' });

app.use(express.json())

app.get('/api/v1', (req, res) => {
  res.json({ message: 'Hello from Node.js!' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  mongoose.connect(process.env.DB_LINK)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

})
