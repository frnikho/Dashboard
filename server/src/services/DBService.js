const mariadb = require('mariadb');

module.exports = mariadb.createPool({
   host: "172.19.0.1",
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DBNAME,
   port: 3306
});