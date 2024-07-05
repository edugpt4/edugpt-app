// File: config.js
module.exports = {
    dbConfig: {
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        server: process.env.SQL_SERVER,
        database: process.env.SQL_DATABASE,
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: process.env.SQL_SERVER_TRUST_CERT === 'true'
        }
    }
};


