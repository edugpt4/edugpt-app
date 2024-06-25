const express = require('express');
const sql = require('mssql');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Configurare baza de date
const dbConfig = {
    user: 'learn.promts',
    password: 'GPTAfeeders.1',
    server: 'edusqlserv.database.windows.net',
    database: 'UsersDB',
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

sql.connect(dbConfig, err => {
    if (err) {
        console.error('Eroare la conectarea la baza de date:', err);
    } else {
        console.log('Conectat la baza de date SQL Server');
    }
});

app.post('/register', (req, res) => {
    const {
        parentFirstName,
        parentLastName,
        parentEmail,
        parentPhone,
        parentPassword,
        childFirstName,
        childLastName,
        childEmail,
        childPhone,
        childAge,
        childGender,
        childBestSubject,
        childWeakSubject,
        childHobby,
        child### index.html

```html
<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduGPT App</title>
    <link rel="stylesheet" href="/bootstrap/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to EduGPT App!</h1>
        <a href="/register.html" class="btn btn-primary">Register</a>
        <a href="/login.html" class="btn btn-secondary">Login</a>
    </div>
    <script src="/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
