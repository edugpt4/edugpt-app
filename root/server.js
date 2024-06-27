const express = require('express');
const sql = require('mssql');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

sql.connect(dbConfig).then(pool => {
    if (pool.connecting) console.log('Connecting to the database...');
    if (pool.connected) console.log('Connected to the database.');
}).catch(err => {
    console.error('Database connection error:', err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/register', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const { ParentFirstName, ParentLastName, ParentEmail, ParentPhone, ParentPassword, ChildFirstName, ChildLastName, ChildEmail, ChildPhone, ChildAge, ChildGender, ChildBestSubject, ChildWeakSubject, ChildHobby, ChildPassword } = req.body;
        const result = await pool.request()
            .input('ParentFirstName', sql.NVarChar, ParentFirstName)
            .input('ParentLastName', sql.NVarChar, ParentLastName)
            .input('ParentEmail', sql.NVarChar, ParentEmail)
            .input('ParentPhone', sql.NVarChar, ParentPhone)
            .input('ParentPassword', sql.NVarChar, ParentPassword)
            .input('ChildFirstName', sql.NVarChar, ChildFirstName)
            .input('ChildLastName', sql.NVarChar, ChildLastName)
            .input('ChildEmail', sql.NVarChar, ChildEmail)
            .input('ChildPhone', sql.NVarChar, ChildPhone)
            .input('ChildAge', sql.Int, ChildAge)
            .input('ChildGender', sql.NVarChar, ChildGender)
            .input('ChildBestSubject', sql.NVarChar, ChildBestSubject)
            .input('ChildWeakSubject', sql.NVarChar, ChildWeakSubject)
            .input('ChildHobby', sql.NVarChar, ChildHobby)
            .input('ChildPassword', sql.NVarChar, ChildPassword)
            .query(`
                INSERT INTO Users (ParentFirstName, ParentLastName, ParentEmail, ParentPhone, ParentPassword, ChildFirstName, ChildLastName, ChildEmail, ChildPhone, ChildAge, ChildGender, ChildBestSubject, ChildWeakSubject, ChildHobby, ChildPassword)
                VALUES (@ParentFirstName, @ParentLastName, @ParentEmail, @ParentPhone, @ParentPassword, @ChildFirstName, @ChildLastName, @ChildEmail, @ChildPhone, @ChildAge, @ChildGender, @ChildBestSubject, @ChildWeakSubject, @ChildHobby, @ChildPassword)
            `);
        res.send('Registration successful');
    } catch (err) {
        console.error('Database insertion error:', err);
        res.status(500).send('Registration error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
