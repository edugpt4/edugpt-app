const express = require('express');
const sql = require('mssql');
const app = express();
const port = process.env.PORT || 3000;

// Middleware pentru a parsa datele din formulare
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurare server static pentru fișierele din folderul public
app.use(express.static('public'));

// Configurare conexiune la baza de date
const dbConfig = {
    user: 'your_db_username',
    password: 'your_db_password',
    server: 'your_db_server.database.windows.net',
    database: 'UsersDB',
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

// Conectare la baza de date
sql.connect(dbConfig, err => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to the database');
    }
});

// Ruta pentru pagina principală
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Ruta pentru pagina de înregistrare
app.get('/register.html', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

// Ruta pentru pagina de autentificare
app.get('/login.html', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Ruta pentru procesarea înregistrării
app.post('/register', (req, res) => {
    const {
        ParentFirstName, ParentLastName, ParentEmail, ParentPhone, ParentPassword,
        ChildFirstName, ChildLastName, ChildEmail, ChildPhone, ChildAge, ChildGender,
        ChildBestSubject, ChildWeakSubject, ChildHobby, ChildPassword
    } = req.body;

    const request = new sql.Request();
    const query = `
        INSERT INTO dbo.Users (ParentFirstName, ParentLastName, ParentEmail, ParentPhone, ParentPassword, 
            ChildFirstName, ChildLastName, ChildEmail, ChildPhone, ChildAge, ChildGender, 
            ChildBestSubject, ChildWeakSubject, ChildHobby, ChildPassword) 
        VALUES (@ParentFirstName, @ParentLastName, @ParentEmail, @ParentPhone, @ParentPassword, 
            @ChildFirstName, @ChildLastName, @ChildEmail, @ChildPhone, @ChildAge, @ChildGender, 
            @ChildBestSubject, @ChildWeakSubject, @ChildHobby, @ChildPassword)`;

    request.input('ParentFirstName', sql.NVarChar, ParentFirstName);
    request.input('ParentLastName', sql.NVarChar, ParentLastName);
    request.input('ParentEmail', sql.NVarChar, ParentEmail);
    request.input('ParentPhone', sql.NVarChar, ParentPhone);
    request.input('ParentPassword', sql.NVarChar, ParentPassword);
    request.input('ChildFirstName', sql.NVarChar, ChildFirstName);
    request.input('ChildLastName', sql.NVarChar, ChildLastName);
    request.input('ChildEmail', sql.NVarChar, ChildEmail);
    request.input('ChildPhone', sql.NVarChar, ChildPhone);
    request.input('ChildAge', sql.Int, ChildAge);
    request.input('ChildGender', sql.NVarChar, ChildGender);
    request.input('ChildBestSubject', sql.NVarChar, ChildBestSubject);
    request.input('ChildWeakSubject', sql.NVarChar, ChildWeakSubject);
    request.input('ChildHobby', sql.NVarChar, ChildHobby);
    request.input('ChildPassword', sql.NVarChar, ChildPassword);

    request.query(query, (err, result) => {
        if (err) {
            console.error('Error inserting data: ', err);
            res.status(500).send('Error inserting data');
        } else {
            res.send('Registration successful');
        }
    });
});

// Pornirea serverului
app.listen(port, () => {
    console.log(`Serverul rulează pe http://localhost:${port}`);
});
