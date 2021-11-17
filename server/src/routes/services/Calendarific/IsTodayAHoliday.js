const express = require('express');
const route = express.Router();
const {isTodayAHoliday} = require("../../../controllers/CalendarificController");

/**
 * Route services/calendar/istodayaholiday/ -> default current day
 *
 * Route services/calendar/istodayaholiday?year={year}&month={month}&day={day}
 *
 * @returns JSON Know if today is an holiday day
 */
route.get('/', (req, res) => {
    console.log("aaaa");
    let year = req.query.year;
    let month = req.query.month;
    let day = req.query.day;
    if (!year || !month || !day) {
        let timestamp = Date.now();
        let now = new Date(timestamp);
        year = now.getFullYear();
        month = now.getMonth() + 1;
        day = now.getDate();
    }
    isTodayAHoliday(year, month, day, (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

module.exports = route;