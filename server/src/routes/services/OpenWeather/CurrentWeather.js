const express = require('express');
const route = express.Router();
const {currentWeather} = require("../../../controllers/OpenWeatherController");
const {authorization} = require("../../../middleware/AuthMiddleware");

/**
 * @openapi
 * /services/openweather/next5daysforecast/:
 *   get:
 *     tags:
 *       - Services
 *     description: Get the next 5 days forecast
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Cannot get forecast
 *       401:
 *         description: User not logged !
 *  @openapi
 *  /services/openweather/next5daysforecast/{city}:
 *   get:
 *     tags:
 *       - Services
 *     description: Get the next 5 days city forecast
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: the city to get the forecast
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Cannot get city forecast
 *       401:
 *         description: User not logged !
 */

/**
 * Route /service/openweather/current/
 *
 * @returns JSON current weather of Nantes
 */
route.get('/', authorization, (req, res) => {
    currentWeather("", (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

/**
 * Route /service/openweather/current/{city}
 *
 * @returns JSON current weather of {city}
 */
route.get('/:id', authorization, (req, res) => {
    currentWeather(req.params.id, (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

module.exports = route;