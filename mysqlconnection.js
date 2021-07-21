var mysql = require("mysql");

var connection = mysql.createConnection({
    "local":"localhost",
    "user": "root",
    "database": "sge",
    "password": "123456",
    "multipleStatements": true
})

connection.connect((err, result) => {
    if (err) throw err;
    console.log("MySQL connected");
})

module.exports = connection;