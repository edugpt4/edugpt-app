const sql = require('mssql');

const config = {
    user: 'learn.promts',
    password: 'GPTAfeeders.1', // asigură-te că înlocuiești {your_password} cu parola ta
    server: 'edusqlserv.database.windows.net',
    database: 'UsersDB',
    options: {
        encrypt: true, // Utilizează SSL
        enableArithAbort: true
    }
};

module.exports = config;
