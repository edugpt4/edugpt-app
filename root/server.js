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
        childPassword
    } = req.body;

    const query = `
        INSERT INTO dbo.Users (ParentFirstName, ParentLastName, ParentEmail, ParentPhone, ParentPassword, ChildFirstName, ChildLastName, ChildEmail, ChildPhone, ChildAge, ChildGender, ChildBestSubject, ChildWeakSubject, ChildHobby, ChildPassword)
        VALUES (@parentFirstName, @parentLastName, @parentEmail, @parentPhone, @parentPassword, @childFirstName, @childLastName, @childEmail, @childPhone, @childAge, @childGender, @childBestSubject, @childWeakSubject, @childHobby, @childPassword)
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

    request.query(query, (err, result) => {
        if (err) {
            console.error('Eroare la inserarea datelor în baza de date:', err);
            res.status(500).json({ success: false });
        } else {
            res.status(200).json({ success: true });
        }
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = `
        SELECT * FROM dbo.Users WHERE ParentEmail = @Email AND ParentPassword = @Password
    `;

    const request = new sql.Request();
    request.input('Email', sql.NVarChar, email);
    request.input('Password', sql.NVarChar, password);

    request.query(query, (err, result) => {
        if (err) {
            console.error('Eroare la autentificare:', err);
            res.status(500).json({ success: false });
        } else {
            if (result.recordset.length > 0) {
                res.status(200).json({ success: true });
            } else {
                res.status(401).json({ success: false });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Serverul rulează pe http://localhost:${port}`);
});
