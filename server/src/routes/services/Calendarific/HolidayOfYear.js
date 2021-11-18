const express = require('express');
const route = express.Router();
const {holidayOfYear} = require("../../../controllers/CalendarificController");
const {authorization} = require("../../../middleware/AuthMiddleware");

/**
 * @openapi
 * /services/calendar/holidayofyear/:
 *   get:
 *     tags:
 *       - Services
 *     description: Get holiday of current year
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Cannot got holidays
 *       401:
 *         description: User not logged !
 *  @openapi
 *  /services/calendar/holidayofyear/{year}:
 *   get:
 *     tags:
 *       - Services
 *     description: Get holiday of the given year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: string
 *         required: true
 *         description: the year of the holidays
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Cannot got holidays
 *       401:
 *         description: User not logged !
 */

/**
 * Route services/calendar/holidayofyear
 * @returns JSON Holiday of current year
 */

route.get('/', authorization, (req, res) => {
    let date = new Date();
    holidayOfYear(date.getFullYear(), (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

/**
 * Route services/calendar/holidayofyear/{year}
 * @returns JSON Holiday of year given in parameter
 */
route.get('/:year', authorization, (req, res) => {
    holidayOfYear(req.params.year, (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

module.exports = route;