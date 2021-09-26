const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'mipss_ib1030ca'
});

mysqlConnection.connect(function(err) {
    if(err) {
        console.error(err);
        return;
    } else {
        console.log('DB is connected');
    }
});

module.exports = mysqlConnection;