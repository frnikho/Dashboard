const db = require('../services/DBService');
const {encrypt, compare} = require('../services/EncryptService');
const uuid = require('uuid');
const {getUserByUsername, getUserByGoogleId} = require("./UserController");

const googleUserExist = (googleId, callback) => {
    db.getConnection().then((con) => {
       con.query(`SELECT google_id FROM users WHERE google_id = '${googleId}'`).then((rows) => {
           callback(rows.length !== 0);
       }).then(async () => {
           await con.end();
       });
    });
}

const registerGoogleUser = (profile, callback) => {
    googleUserExist(profile.id, (exists) => {
        if (exists) {
            getUserByGoogleId(profile.id, (user) => {
                callback(user);
            });
        } else {
            db.getConnection().then((con) => {
                let username = uuid.v4();
                con.query(`INSERT INTO users (username, password, account_type, google_id) values (?, ?, ?, ?) RETURNING id,username,created_date,account_type`, [username, "null", "google", profile.id]).then((response) => {
                    callback(response)
                }).then(async () => {
                    await con.end();
                });
            });
        }
    });
}

const loginUser = (username, password, callback) => {
    db.getConnection().then((con) => {
       con.query(`SELECT password FROM users WHERE username = '${username}';`).then((rows) => {
           if (rows.length === 0)
               return callback(null);
           compare(rows[0].password, password).then((result) => {
               if (!result)
                   return callback(null);
                getUserByUsername(username, (user) => {
                    callback(user);
                });
           })
       }).then(async () => {
           await con.end();
       });
    });
}

const checkUsernameValidity = (username, callback) => {
    if (username.length < 5)
        return callback(false);
    db.getConnection().then((con) => {
        con.query(`SELECT username FROM users WHERE username ='${username}'`).then((rows) => {
            return callback(rows.length === 0)
        }).then(async () => {
            await con.end();
        });
    })
}

const registerUser = (username, password, callback, error) => {
    checkUsernameValidity(username, (isValid) => {
        if (!isValid)
            return error('username not available !')
        encrypt(password).then((hashedPassword) => {
            db.getConnection().then((con) => {
                con.query(`INSERT INTO users (username, password) values (?, ?) RETURNING id,username,created_date,account_type`, [username, hashedPassword]).then((response) => {
                    callback(response)
                }).then(async () => {
                    await con.end();
                });
            })
        });
    });
}

const checkPasswordValidity = (password) => {

}

module.exports = {checkUsernameValidity, registerUser, loginUser, registerGoogleUser}