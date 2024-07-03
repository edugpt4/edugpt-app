const express = require('express');
const sql = require('mssql');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configurația bazei de date
const dbConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true // Dacă serverul tău folosește un certificat de securitate
    }
};

// Conectare la baza de date
sql.connect(dbConfig).then(pool => {
    if (pool.connected) {
        console.log('Conectat la baza de date.');
    }
}).catch(err => {
    console.error('Eroare la conectarea la baza de date:', err);
});

// Middleware pentru a analiza corpul cererii
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setare middleware pentru a servi fișiere statice
app.use(express.static(path.join(__dirname, 'public')));

// Rute
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rute pentru autentificare și înregistrare
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, phoneNumber } = req.body;
    // Validare și logică de înregistrare
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('firstName', sql.VarChar, firstName)
            .input('lastName', sql.VarChar, lastName)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .input('phoneNumber', sql.VarChar, phoneNumber)
            .query(`
                INSERT INTO Users (FirstName, LastName, Email, Password, PhoneNumber)
                VALUES (@firstName, @lastName, @email, @password, @phoneNumber)
            `);
        res.send('Înregistrare reușită!');
    } catch (err) {
        console.error('Eroare la înregistrare:', err);
        res.status(500).send('A apărut o eroare la înregistrare.');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Validare și logică de autentificare
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query(`
                SELECT * FROM Users WHERE Email = @email AND Password = @password
            `);
        if (result.recordset.length > 0) {
            res.send('Autentificare reușită!');
        } else {
            res.status(401).send('Email sau parolă incorecte.');
        }
    } catch (err) {
        console.error('Eroare la autentificare:', err);
        res.status(500).send('A apărut o eroare la autentificare.');
    }
});

// Pornire server
app.listen(port, () => {
    console.log(`Serverul rulează pe http://localhost:${port}`);
});
