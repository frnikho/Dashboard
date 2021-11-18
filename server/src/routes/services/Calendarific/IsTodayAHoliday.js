const express = require('express');
const route = express.Router();
const {isTodayAHoliday} = require("../../../controllers/CalendarificController");
const {authorization} = require("../../../middleware/AuthMiddleware");

/**
 * @openapi
 * /services/calendar/istodayaholiday/:
 *   get:
 *     tags:
 *       - Services
 *     description: Check if the current day is a holidays day or not
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Cannot got holidays
 *       401:
 *         description: User not logged !
 */

/**
 * Route services/calendar/istodayaholiday/ -> default current day
 *
 * Route services/calendar/istodayaholiday?year={year}&month={month}&day={day}
 *
 * @returns JSON Know if today is an holiday day
 */
route.get('/', authorization, (req, res) => {
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