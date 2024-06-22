const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const config = require('./config');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
    try {
        let pool = await sql.connect(config);
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
                INSERT INTO Users 
                (ParentFirstName, ParentLastName, ParentEmail, ParentPhone, ParentPassword, 
                 ChildFirstName, ChildLastName, ChildEmail, ChildPhone, ChildAge, 
                 ChildGender, ChildBestSubject, ChildWeakSubject, ChildHobby, ChildPassword) 
                VALUES 
                (@ParentFirstName, @ParentLastName, @ParentEmail, @ParentPhone, @ParentPassword, 
                 @ChildFirstName, @ChildLastName, @ChildEmail, @ChildPhone, @ChildAge, 
                 @ChildGender, @ChildBestSubject, @ChildWeakSubject, @ChildHobby, @ChildPassword)`);
        res.redirect('/login.html');
    } catch (err) {
        console.error(err);
        res.send("Error registering user");
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
