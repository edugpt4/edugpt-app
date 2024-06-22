const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const config = require('./config');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

sql.connect(config, err => {
    if (err) console.log(err);
    else console.log('Connected to SQL Server');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const request = new sql.Request();
    request.input('UserEmail', sql.NVarChar, email);
    request.input('UserPassword', sql.NVarChar, password);
    request.query('SELECT * FROM Users WHERE UserEmail = @UserEmail AND UserPassword = @UserPassword', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
        } else {
            if (result.recordset.length > 0) {
                res.send('Login successful');
            } else {
                res.send('Invalid email or password');
            }
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
