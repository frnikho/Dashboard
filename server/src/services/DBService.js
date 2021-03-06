const mariadb = require('mariadb');

module.exports = mariadb.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DBNAME,
   port: 3306
});