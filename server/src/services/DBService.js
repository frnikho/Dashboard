const mariadb = require('mariadb');

const getConnection = () => mariadb.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DBNAME,
}).getConnection();

module.exports = {getConnection}