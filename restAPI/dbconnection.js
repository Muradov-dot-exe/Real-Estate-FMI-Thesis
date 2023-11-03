const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass123",
  database: "real_estate_db",
});

module.exports = connection;
