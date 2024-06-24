const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const sql = require('mssql');

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

app.use(bodyParser.urlencoded({ extended: true }));

// Servirea fișierelor statice
app.use(express.static(path.join(__dirname, 'public')));

// Rutele aplicației
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Ruta pentru procesarea formularului de înregistrare
app.post('/register', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('ParentFirstName', sql.NVarChar, req.body.parentFirstName)
            .input('ParentLastName', sql.NVarChar, req.body.parentLastName)
            .input('ParentEmail', sql.NVarChar, req.body.parentEmail)
            .input('ParentPhone', sql.NVarChar, req.body.parentPhone)
            .input('ParentPassword', sql.NVarChar, req.body.parentPassword)
            .input('ChildFirstName', sql.NVarChar, req.body.childFirstName)
            .input('ChildLastName', sql.NVarChar, req.body.childLastName)
            .input('ChildEmail', sql.NVarChar, req.body.childEmail)
            .input('ChildPhone', sql.NVarChar, req.body.childPhone)
            .input('ChildAge', sql.Int, req.body.childAge)
            .input('ChildGender', sql.NVarChar, req.body.childGender)
            .input('ChildBestSubject', sql.NVarChar, req.body.childBestSubject)
            .input('ChildWeakSubject', sql.NVarChar, req.body.childWeakSubject)
            .input('ChildHobby', sql.NVarChar, req.body.childHobby)
            .input('ChildPassword', sql.NVarChar, req.body.childPassword)
            .query(`
                INSERT INTO dbo.Users 
                (ParentFirstName, ParentLastName, ParentEmail, ParentPhone, ParentPassword, 
                ChildFirstName, ChildLastName, ChildEmail, ChildPhone, ChildAge, 
                ChildGender, ChildBestSubject, ChildWeakSubject, ChildHobby, ChildPassword) 
                VALUES 
                (@ParentFirstName, @ParentLastName, @ParentEmail, @ParentPhone, @ParentPassword, 
                @ChildFirstName, @ChildLastName, @ChildEmail, @ChildPhone, @ChildAge, 
                @ChildGender, @ChildBestSubject, @ChildWeakSubject, @ChildHobby, @ChildPassword)
            `);

        res.send('Înregistrare reușită!'); // Poți personaliza acest mesaj
    } catch (err) {
        console.error('Error while inserting data:', err);
        res.status(500).send('A apărut o eroare la înregistrare.');
    }
});

// Pornirea serverului
app.listen(port, () => {
    console.log(`Serverul rulează pe http://localhost:${port}`);
});
