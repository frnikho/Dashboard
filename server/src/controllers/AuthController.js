const db = require('../services/DBService');
const {encrypt, compare} = require('../services/EncryptService');
const uuid = require('uuid');
const {getUserByUsername, getUserByGoogleId} = require("./UserController");
const {response} = require("express");
const {DEFAULT_CURRENT_WEATHER, DEFAULT_NEXT_5_DAYS_FORECAST} = require("./ConfigController");

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
    googleUserExist(profile.googleId, (exists) => {
        if (exists) {
            getUserByGoogleId(profile.googleId, (user) => {
                callback(user);
            });
        } else {
            db.getConnection().then((con) => {
                let username = profile.email;
                let passwd = uuid.v4();
                con.query(`INSERT INTO users (username, password, account_type, google_id) values (?, ?, ?, ?) RETURNING id,username,created_date,account_type`, [username, passwd, "google", profile.googleId]).then((response) => {
                    con.query(`INSERT INTO widgets_config (user_id, data) values (?, ?)`, [response[0].id, "[]"]).then(async () => {
                        con.query(`INSERT INTO timers (user_id, current_weather, next_5_days_forecast) values (?, ?, ?)`, [response[0].id, DEFAULT_CURRENT_WEATHER, DEFAULT_NEXT_5_DAYS_FORECAST]).then((rows) => {
                            callback(response[0]);
                        }).then(async () => {
                            await con.end();
                        })
                    })
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

const registerUser = (username, password, firstname, lastname, callback, error) => {
    checkUsernameValidity(username, (isValid) => {
        if (!isValid)
            return error('username not available !')
        encrypt(password).then((hashedPassword) => {
            db.getConnection().then((con) => {
                con.query(`INSERT INTO users (username, password, first_name, last_name) values (?, ?, ?, ?) RETURNING id,username,created_date,account_type, first_name, last_name`, [username, hashedPassword, firstname, lastname]).then((response) => {
                    con.query(`INSERT INTO widgets_config (user_id, data) values (?, ?)`, [response[0].id, "[]"]).then(async () => {
                        con.query(`INSERT INTO timers (user_id, current_weather, next_5_days_forecast) values (?, ?, ?)`, [response[0].id, DEFAULT_CURRENT_WEATHER, DEFAULT_NEXT_5_DAYS_FORECAST]).then((rows) => {
                            callback(response[0]);
                        }).then(async () => {
                            await con.end();
                        })
                    })
                });
            })
        });
    });
}

const checkPasswordValidity = (password) => {

}

module.exports = {checkUsernameValidity, registerUser, loginUser, registerGoogleUser}