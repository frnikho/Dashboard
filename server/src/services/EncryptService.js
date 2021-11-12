const bcrypt = require('bcrypt');

const encrypt = (data) => bcrypt.hash(data, 10);

const compare = (hashedData, data) => bcrypt.compare(data, hashedData);

module.exports = {encrypt, compare}