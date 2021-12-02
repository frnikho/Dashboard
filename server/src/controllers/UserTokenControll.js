const db = require('../services/DBService');

const getUserToken = (userId, service, callback) => {
    db.getConnection().then((con) => {
        con.query(`SELECT * FROM users_token WHERE user_id = '${userId}' AND service = '${service}'`).then((rows) => {
            callback(rows[0]);
        }).then(async () => {
            await con.end();
        })
    })
}

const insertUserToken = (userId, service, data, callback) => {
    db.getConnection().then((con) => {
        con.query(`INSERT INTO users_token (user_id, service, access_token, refresh_token, token_type) VALUES(?, ?, ?, ?, ?)`, [userId, service, data.access_token, data.refresh_token, data.token_type]).then((rows) => {
            callback(rows);
        }).then(async () => {
            await con.end();
        }).catch((err) => {
            callback(err);
        });
    })
}

const updateUserToken = (userId, service, data, callback) => {
    db.getConnection().then((con) => {
        con.query(`UPDATE users_token SET access_token = ?, refresh_token = ?, token_type = ? WHERE user_id LIKE '${userId}'`, [data.access_token, data.refresh_token, data.token_type]).then((rows) => {
            callback(rows);
        }).then(async () => {
            await con.end();
        }).catch((err) => {
            callback(err);
        });
    })
}

module.exports = {getUserToken, insertUserToken, updateUserToken}