const express = require('express');
const sql = require('mssql');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Configurare baza de date utilizând variabile de mediu
const dbConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

// Conectare la baza de date
sql.connect(dbConfig, (err) => {
    if (err) {
        console.error('Eroare la conectarea la baza de date:', err);
    } else {
        console.log('Conectat la baza de date SQL Server');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register', (req, res) => {
    const {
        parentFirstName, parentLastName, parentEmail, parentPhone, parentPassword,
        childFirstName, childLastName, childEmail, childPhone, childAge, childGender,
        childBestSubject, childWeakSubject, childHobby, childPassword
    } = req.body;

    const query = `
        INSERT INTO dbo.Users (
            ParentFirstName, ParentLastName, ParentEmail, ParentPhone, ParentPassword,
            ChildFirstName, ChildLastName, ChildEmail, ChildPhone, ChildAge, ChildGender,
            ChildBestSubject, ChildWeakSubject, ChildHobby, ChildPassword
        ) VALUES (
            @parentFirstName, @parentLastName, @parentEmail, @parentPhone, @parentPassword,
            @childFirstName, @childLastName, @childEmail, @childPhone, @childAge, @childGender,
            @childBestSubject, @childWeakSubject, @childHobby, @childPassword
        )
    `;

    const request = new sql.Request();
    request.input('parentFirstName', sql.NVarChar, parentFirstName);
    request.input('parentLastName', sql.NVarChar, parentLastName);
    request.input('parentEmail', sql.NVarChar, parentEmail);
    request.input('parentPhone', sql.NVarChar, parentPhone);
    request.input('parentPassword', sql.NVarChar, parentPassword);
    request.input('childFirstName', sql.NVarChar, childFirstName);
    request.input('childLastName', sql.NVarChar, childLastName);
    request.input('childEmail', sql.NVarChar, childEmail);
    request.input('childPhone', sql.NVarChar, childPhone);
    request.input('childAge', sql.Int, childAge);
    request.input('childGender', sql.NVarChar, childGender);
    request.input('childBestSubject', sql.NVarChar, childBestSubject);
    request.input('childWeakSubject', sql.NVarChar, childWeakSubject);
    request.input('childHobby', sql.NVarChar, childHobby);
    request.input('childPassword', sql.NVarChar, childPassword);

    request.query(query, (err) => {
        if (err) {
            console.error('Eroare la inserarea datelor în baza de date:', err);
            res.send('Eroare la înregistrare');
        } else {
            res.send('Înregistrare reușită');
        }
    });
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = `
        SELECT * FROM dbo.Users
        WHERE ParentEmail = @Email AND ParentPassword = @Password
    `;

    const request = new sql.Request();
    request.input('Email', sql.NVarChar, email);
    request.input('Password', sql.NVarChar, password);

    request.query(query, (err, result) => {
        if (err) {
            console.error('Eroare la autentificare:', err);
            res.send('Eroare la autentificare');
        } else if (result.recordset.length > 0) {
            res.send('Autentificare reușită');
        } else {
            res.send('Email sau parolă incorecte');
        }
    });
});

app.listen(port, () => {
    console.log(`Serverul rulează pe http://localhost:${port}`);
});
