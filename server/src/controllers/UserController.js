const db = require('../services/DBService');

const getUserByUsername = (username, callback) => {
    db.getConnection().then((con) => {
       con.query(`SELECT id, username, created_date, account_type, google_id FROM users WHERE username='${username}'`).then((rows) => {
           callback(rows[0]);
       }).then(async () => {
           await con.end();
       })
    });
}

const getUserById = (id, callback) => {
    db.getConnection().then((con) => {
        con.query(`SELECT id, username, created_date, account_type, google_id FROM users WHERE id='${id}' `).then((rows) => {
            callback(rows[0]);
        }).then(async () => {
            await con.end();
        });
    })
}

const getUserByGoogleId = (googleId, callback) => {
    db.getConnection().then((con) => {
        con.query(`SELECT id, username, created_date, account_type, google_id FROM users WHERE google_id='${googleId}' `).then((rows) => {
            callback(rows[0]);
        }).then(async () => {
            await con.end();
        });
    });
}

module.exports = {getUserByUsername, getUserById, getUserByGoogleId}