const express = require('express')
const path = require('path')
const app = express()

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'HTML', 'index.html'))
})

app.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'HTML', 'history.html'))
})

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'HTML', 'menu.html'))
})

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'HTML', 'contact.html'))
})

app.get('/location', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'HTML', 'location.html'))
})

// Start server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})

