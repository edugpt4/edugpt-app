const express = require('express');
const sql = require('mssql');
const dotenv = require('dotenv');

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
    if (pool.connecting) {
        console.log('Connecting to the database...');
    }
    if (pool.connected) {
        console.log('Connected to the database.');
    }
}).catch(err => {
    console.error('Database connection error:', err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the root/public directory
app.use(express.static(path.join(__dirname, 'root', 'public')));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'root', 'public', 'index.html'));
});

// Route to serve the register.html file
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'root', 'public', 'register.html'));
});

// Route to serve the login.html file
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'root', 'public', 'login.html'));
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
        res.send('Înregistrare realizată cu succes');
    } catch (err) {
        console.error('Eroare la inserarea datelor în baza de date:', err);
        res.status(500).send('Eroare la înregistrare');
    }
});

app.listen(port, () => {
    console.log(`Serverul rulează pe http://localhost:${port}`);
});
