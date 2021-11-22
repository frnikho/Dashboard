const db = require('../services/DBService');

const getUserWidgetsConfig = (userId, callback) => {
    db.getConnection().then((con) => {
        con.query(`SELECT * FROM widgets_config WHERE user_id = '${userId}'`).then((rows) => {
            callback(rows[0]);
        }).then(async () => {
            await con.end();
        })
    })
}

const updateUserWidgetsConfig = (userId, config, callback) => {
    db.getConnection().then((con) => {

        con.query(`UPDATE widgets_config SET data = '${JSON.stringify(config)}' WHERE user_id LIKE '${userId}';`).then((rows) => {
            callback(rows);
        }).then(async () => {
            await con.end();
        })
    })
}

const resetUserWidgetsConfig = (userId, callback) => {
    db.getConnection().then((con) => {
        con.query(`UPDATE widgets_config SET data = '{}' WHERE user_id LIKE '${userId}';`).then((rows) => {
            callback(rows[0]);
        }).then(async () => {
            await con.end();
        })
    })
}

module.exports = {getUserWidgetsConfig, updateUserWidgetsConfig, resetUserWidgetsConfig}