const db = require('../services/DBService');

const DEFAULT_CURRENT_WEATHER = 30;
const DEFAULT_NEXT_5_DAYS_FORECAST = 30;

const updateTimerSettings = (userId, currentWeatherTimers, next5DaysForecastTimers, callback) => {
    db.getConnection().then((con) => {
       con.query(`UPDATE timers SET current_weather = ${currentWeatherTimers}, next_5_days_forecast = ${next5DaysForecastTimers} WHERE user_id LIKE '${userId}';`).then((rows) => {
           callback(rows);
       })
    });
};

const resetTimerSettings = (userId, callback) => {
    db.getConnection().then((con) => {
        con.query(`UPDATE timers SET current_weather = ${DEFAULT_CURRENT_WEATHER}, next_5_days_forecast = ${DEFAULT_NEXT_5_DAYS_FORECAST} WHERE user_id LIKE '${userId}';`).then((rows) => {
            callback(rows);
        })
    });
};

module.exports = {updateTimerSettings, resetTimerSettings, DEFAULT_CURRENT_WEATHER, DEFAULT_NEXT_5_DAYS_FORECAST}