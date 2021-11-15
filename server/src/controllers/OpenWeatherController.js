const {getCurrentWeather, getNext5DaysForecast} = require('../services/OpenWeatherService');
const defaultCity = "Nantes";

/**
 * Current weather
 *
 * @param {*} city - default city = Nantes
 * @param {*} callback
 * @param {*} error
 */
const currentWeather = (city, callback, error) => {
    getCurrentWeather(city === "" ? defaultCity : city).then((data) => {
        callback(data);
    }).catch(() => {
        error("Error to get current weather for '" + city + "' city");
    })
}


/**
 * Current weather
 *
 * @param {*} city - default city = Nantes
 * @param {*} callback
 * @param {*} error
 */
 const next5DaysForecast = (city, callback, error) => {
    getNext5DaysForecast(city === "" ? defaultCity : city).then((data) => {
        callback(data);
    }).catch(() => {
        error("Error to get next 5 days forecast for '" + city + "' city");
    })
}

module.exports = {currentWeather, next5DaysForecast}