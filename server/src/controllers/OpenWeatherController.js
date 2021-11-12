const {getCurrentWeather} = require('../services/OpenWeatherService');
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

module.exports = {currentWeather}