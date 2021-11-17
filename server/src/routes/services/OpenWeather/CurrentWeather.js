const express = require('express');
const route = express.Router();
const {currentWeather} = require("../../../controllers/OpenWeatherController");



/**
 * Route /service/openweather/current/
 *
 * @returns JSON current weather of Nantes
 */
route.get('/', (req, res) => {
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
route.get('/:id', (req, res) => {
    currentWeather(req.params.id, (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

module.exports = route;