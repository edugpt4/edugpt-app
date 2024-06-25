const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

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

sql.connect(dbConfig).then(pool => {
    console.log('Conectat la baza de date SQL Server');
    return pool;
}).catch(err => {
    console.error('Eroare la conectarea la baza de date:', err);
});

app.use(bodyParser.urlencoded({ extended: true }));
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

app.post('/register', (req, res) => {
    const {
        parentFirstName, parentLastName, parentEmail, parentPhone, parentPassword,
        childFirstName, childLastName, childEmail, childPhone, childAge, childGender,
        childBestSubject, childWeakSubject, childHobby, childPassword
    } = req.body;

    const request = new sql.Request();
    const query = `INSERT INTO dbo.Users (
        ParentFirstName, ParentLastName, ParentEmail, ParentPhone, ParentPassword,
        ChildFirstName, ChildLastName, ChildEmail, ChildPhone, ChildAge, ChildGender,
        ChildBestSubject, ChildWeakSubject, ChildHobby, ChildPassword### Codul complet pentru server.js

Iată codul complet pentru `server.js`, care include toate rutele necesare și configurările pentru a gestiona paginile `index.html`, `login.html` și `register.html`.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

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

sql.connect(dbConfig).then(pool => {
    console.log('Conectat la baza de date SQL Server');
    return pool;
}).catch(err => {
    console.error('Eroare la conectarea la baza de date:', err);
});

app.use(bodyParser.urlencoded({ extended: true }));
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

app.post('/register', (req, res) => {
    const {
        parentFirstName, parentLastName, parentEmail, parentPhone, parentPassword,
        childFirstName, childLastName, childEmail, childPhone, childAge, childGender,
        childBestSubject, childWeakSubject, childHobby, childPassword
    } = req.body;

    const request = new sql.Request();
    const query = `INSERT INTO dbo.Users (
        ParentFirstName, ParentLastName, ParentEmail, ParentPhone, ParentPassword,
        ChildFirstName, ChildLastName, ChildEmail, ChildPhone, ChildAge, ChildGender,
        ChildBestSubject, ChildWeakSubject, ChildHobby, ChildPassword
    ) VALUES (
        @parentFirstName, @parentLastName, @parentEmail, @parentPhone, @parentPassword,
        @childFirstName, @childLastName, @childEmail, @childPhone, @childAge, @childGender,
        @childBestSubject, @childWeakSubject, @childHobby, @childPassword
    )`;

    request.input('parentFirstName', sql.NVarChar, parentFirstName)
        .input('parentLastName', sql.NVarChar, parentLastName)
        .input('parentEmail', sql.NVarChar, parentEmail)
        .input('parentPhone', sql.NVarChar, parentPhone)
        .input('parentPassword', sql.NVarChar, parentPassword)
        .input('childFirstName', sql.NVarChar, childFirstName)
        .input('childLastName', sql.NVarChar, childLastName)
        .input('childEmail', sql.NVarChar, childEmail)
        .input('childPhone', sql.NVarChar, childPhone)
        .input('childAge', sql.Int, childAge)
        .input('childGender', sql.NVarChar, childGender)
        .input('childBestSubject', sql.NVarChar, childBestSubject)
        .input('childWeakSubject', sql.NVarChar, childWeakSubject)
        .input('childHobby', sql.NVarChar, childHobby)
        .input('childPassword', sql.NVarChar, childPassword)
        .query(query)
        .then(() => {
            res.send('Înregistrare reușită');
        })
        .catch(err => {
            console.error('Eroare la inserarea datelor în baza de date:', err);
            res.send('Eroare la înregistrare');
        });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const request = new sql.Request();
    const query = `SELECT * FROM dbo.Users WHERE ParentEmail = @Email AND ParentPassword = @Password`;

    request.input('Email', sql.NVarChar, email)
        .input('Password', sql.NVarChar, password)
        .query(query)
        .then(result => {
            if (result.recordset.length > 0) {
                res.send('Autentificare reușită');
            } else {
                res.send('Email sau parolă incorectă');
            }
        })
        .catch(err => {
            console.error('Eroare la autentificare:', err);
            res.send('Eroare la autentificare');
        });
});

app.listen(port, () => {
    console.log(`Serverul rulează pe http://localhost:${port}`);
});
