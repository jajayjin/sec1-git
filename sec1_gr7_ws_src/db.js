const mysql = require("mysql");
const dotenv= require('dotenv');
dotenv.config();
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_USERNAME,
    user: process.env.MYSQL_PASSWORD,
    password: process.env.MYSQL_DATABASE
});
module.exports = connection;