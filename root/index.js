// File: index.js
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'edugpt-app')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serverul rulează pe http://localhost:${port}`);
});



