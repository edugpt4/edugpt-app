const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Configurare calea pentru fișierele statice
app.use(express.static(path.join(__dirname, 'public')));

// Routing pentru paginile HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

