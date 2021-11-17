
const apiKey = process.env.CALENDARIFIC_API_KEY;
const axios = require('axios').default;

/**
 * Get data about if today is an holiday
 *
 * https://calendarific.com/api-documentation
 *
 * @param {*} year
 * @param {*} month
 * @param {*} day
 * @param {*} exchange
 * @returns
 */
const getIsTodayAHoliday = async (year, month, day, exchange) => {
    const url = "https://calendarific.com/api/v2/holidays?&api_key=" + apiKey + "&country=FR&day=" + day + "&month=" + month + "&year=" + year;
    let data = await axios.get(url);
    return data.data;
}

/**
 * Get data about holidays in given year
 *
 * https://calendarific.com/api-documentation
 *
 * @param {*} year
 * @returns JSON
 */
 const getHolidayOfYear = async (year) => {
    const url = "https://calendarific.com/api/v2/holidays?&api_key=" + apiKey + "&country=FR&year=" + year;
    let data = await axios.get(url);
    return data.data;
}

module.exports = {getIsTodayAHoliday, getHolidayOfYear}