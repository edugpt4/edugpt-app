const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sql.connect(config, (err) => {
    if (err) {
        console.log("Error connecting to the database: ", err);
        return;
    }
    console.log("Connected to the database.");
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const request = new sql.Request();

    request.input('UserEmail', sql.NVarChar, email);
    request.input('UserPassword', sql.NVarChar, password);
    
    request.query('SELECT * FROM Users WHERE UserEmail = @UserEmail AND UserPassword = @UserPassword', (err, result) => {
        if (err) {
            console.log("Error querying the database: ", err);
            res.status(500).send('Internal server error');
            return;
        }

        if (result.recordset.length > 0) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

