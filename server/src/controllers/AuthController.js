const db = require('../services/DBService');
const {encrypt} = require('../services/EncryptService');

const checkUsernameValidity = (username, callback) => {
    if (username.length < 5)
        return callback(false);
    db.getConnection().then((con) => {
        con.query(`SELECT username FROM users WHERE username ='${username}'`).then((rows) => {
            return callback(rows.length === 0)
        });
    })
}

const registerUser = (username, password, callback, error) => {
    checkUsernameValidity(username, (isValid) => {
        if (!isValid)
            return error('username not available !')
        encrypt(password).then((hashedPassword) => {
            db.getConnection().then((con) => {
                con.query(`INSERT INTO users (username, password) value (?, ?) RETURNING id,username,created_date,account_type`, [username, hashedPassword]).then((response) => {
                    callback(response)
                });
            })
        });
    });
}

const checkPasswordValidity = (password) => {

}

module.exports = {checkUsernameValidity, registerUser}