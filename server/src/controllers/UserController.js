const db = require('../services/DBService');
const {getUserWidgetsConfig, updateUserWidgetsConfig} = require("./WidgetController");

const getUserByUsername = (username, callback) => {
    db.getConnection().then((con) => {
       con.query(`SELECT id, username, created_date, account_type, google_id, first_name, last_name, layout FROM users WHERE username='${username}'`).then((rows) => {
           callback(rows[0]);
       }).then(async () => {
           await con.end();
       })
    });
}

const getUserById = (id, callback) => {
    db.getConnection().then((con) => {
        con.query(`SELECT id, username, created_date, account_type, google_id, first_name, last_name, layout FROM users WHERE id='${id}' `).then((rows) => {
            callback(rows[0]);
        }).then(async () => {
            await con.end();
        });
    })
}

const getUserByGoogleId = (googleId, callback) => {
    db.getConnection().then((con) => {
        con.query(`SELECT id, username, created_date, account_type, google_id, first_name, last_name, layout FROM users WHERE google_id='${googleId}' `).then((rows) => {
            callback(rows[0]);
        }).then(async () => {
            await con.end();
        });
    });
}

const updateUserLayout = (userId, layout, callback) => {
    db.getConnection().then((con) => {
        con.query(`UPDATE users SET layout = '${JSON.stringify(layout)}' WHERE id LIKE '${userId}';`).then((rows) => {
            callback(rows[0]);
        }).then(async () => {
            await con.end();
        });
    });
}

const deleteUserWidget = (userId, layout, widgetId, callback) => {
    getUserWidgetsConfig(userId, (widgetConfig) => {
        widgetConfig.data.forEach((widget, index) => {
            if (widget.id === widgetId)
                widgetConfig.data.splice(index, 1);
        });
        updateUserWidgetsConfig(userId, widgetConfig.data, (response) => {
            layout.forEach((l, index) => {
                if (l.id === widgetId)
                    layout.splice(index, 1);
            })
            updateUserLayout(userId, layout, (data) => {
                callback(data);
            })
        });
    })
}

module.exports = {getUserByUsername, getUserById, getUserByGoogleId, updateUserLayout, deleteUserWidget}