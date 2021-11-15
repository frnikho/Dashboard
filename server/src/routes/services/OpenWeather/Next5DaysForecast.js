const express = require('express');
const route = express.Router();
const {next5DaysForecast} = require("../../../controllers/OpenWeatherController");

/**
 * Route /service/openweather/next5daysforecast/
 *
 * @returns JSON current weather of Nantes
 */
route.get('/', (req, res) => {
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
route.get('/:id', (req, res) => {
    next5DaysForecast(req.params.id, (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

module.exports = route;