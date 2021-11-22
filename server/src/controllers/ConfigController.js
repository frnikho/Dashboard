const db = require('../services/DBService');

const DEFAULT_CURRENT_WEATHER = 30;
const DEFAULT_NEXT_5_DAYS_FORECAST = 30;

const getUserTimer = (userId, callback) => {
    db.getConnection().then((con) => {
        con.query(`SELECT * FROM timers WHERE user_id = '${userId}'`).then((rows) => {
            callback(rows[0]);
        }).then(async () => {
            await con.end();
        })
    });
}

const updateTimerSettings = (userId, currentWeatherTimers, next5DaysForecastTimers, callback) => {
    db.getConnection().then((con) => {
       con.query(`UPDATE timers SET current_weather = ${currentWeatherTimers}, next_5_days_forecast = ${next5DaysForecastTimers} WHERE user_id LIKE '${userId}';`).then((rows) => {
           callback(rows);
       }).then(async () => {
           await con.end();
       })
    });
};

const resetTimerSettings = (userId, callback) => {
    db.getConnection().then((con) => {
        con.query(`UPDATE timers SET current_weather = ${DEFAULT_CURRENT_WEATHER}, next_5_days_forecast = ${DEFAULT_NEXT_5_DAYS_FORECAST} WHERE user_id LIKE '${userId}';`).then((rows) => {
            callback(rows);
        }).then(async () => {
            await con.end();
        })
    });
};

module.exports = {updateTimerSettings, resetTimerSettings, getUserTimer, DEFAULT_CURRENT_WEATHER, DEFAULT_NEXT_5_DAYS_FORECAST}