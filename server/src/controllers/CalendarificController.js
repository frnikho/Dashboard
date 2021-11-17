const {getIsTodayAHoliday, getHolidayOfYear} = require('../services/CalendarificService');

/**
 * Get data about if today is an holiday
 *
 * @param {*} year
 * @param {*} month
 * @param {*} day
 * @param {*} callback
 * @param {*} error
 */
const isTodayAHoliday = (year, month, day, callback, error) => {
    getIsTodayAHoliday(year, month, day).then((data) => {
        callback(data);
    }).catch(() => {
        error("Error to get holiday info on day " + day + "/" + month + "/" + year);
    })
}

/**
 * Get data about holidays in given year
 *
 * @param {*} year
 * @param {*} callback
 * @param {*} error
 */
 const holidayOfYear = (year, callback, error) => {
    getHolidayOfYear(year).then((data) => {
        callback(data);
    }).catch(() => {
        error("Error to get holiday info on year " + year);
    })
}

module.exports = {isTodayAHoliday, holidayOfYear}