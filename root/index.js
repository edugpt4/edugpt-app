const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
<a href="/register">Register</a>

app.get('/', (req, res) => {
  res.send('Welcome to EduGPT App!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
