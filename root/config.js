require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    dbConfig: {
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        server: process.env.SQL_SERVER,
        database: process.env.SQL_DATABASE,
        options: {
            encrypt: true,
            enableArithAbort: true
        }
    }
};





