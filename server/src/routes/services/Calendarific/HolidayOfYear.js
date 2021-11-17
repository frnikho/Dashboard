const express = require('express');
const route = express.Router();
const {holidayOfYear} = require("../../../controllers/CalendarificController");

/**
 * Route services/calendar/holidayofyear
 *
 * @returns JSON Holiday of current year
 */
route.get('/', (req, res) => {
    let date = new Date();
    holidayOfYear(date.getFullYear(), (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

/**
 * Route services/calendar/holidayofyear/{years}
 *
 * @returns JSON Holiday of year given in parameter
 */
route.get('/:year', (req, res) => {
    holidayOfYear(req.params.year, (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

module.exports = route;