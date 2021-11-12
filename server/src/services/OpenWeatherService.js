
const apiKey = process.env.OPENWEATHER_API_KEY;
const axios = require('axios').default;

/**
 * Get current weather
 *
 * https://openweathermap.org/current
 *
 * @param {*} city
 * @returns JSON
 */
const getCurrentWeather = async (city) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    let data = await axios.get(url);
    return data.data;
}

module.exports = {getCurrentWeather}