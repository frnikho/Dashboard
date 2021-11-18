const express = require('express');
const route = express.Router();
const {next5DaysForecast} = require("../../../controllers/OpenWeatherController");
const {authorization} = require("../../../middleware/AuthMiddleware");

/**
 * @openapi
 * /services/openweather/current/:
 *   get:
 *     tags:
 *       - Services
 *     description: Get current weather
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Cannot get current weathers
 *       401:
 *         description: User not logged !
 *  @openapi
 *  /services/openweather/current/{city}:
 *   get:
 *     tags:
 *       - Services
 *     description: Get current city weathers
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: the city to get the weather
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Cannot get city weather
 *       401:
 *         description: User not logged !
 */

/**
 * Route /service/openweather/next5daysforecast/
 *
 * @returns JSON current weather of Nantes
 */
route.get('/', authorization, (req, res) => {
    next5DaysForecast("", (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

/**
 * Route /service/openweather/next5daysforecast/{city}
 *
 * @returns JSON current weather of {city}
 */
route.get('/:id', authorization, (req, res) => {
    next5DaysForecast(req.params.id, (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

module.exports = route;