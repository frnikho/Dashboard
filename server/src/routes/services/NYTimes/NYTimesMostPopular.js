const express = require('express');
const route = express.Router();
const {mostPopular} = require("../../../controllers/NYTimesController");
const defaultDays = 1;

/**
 * Route /services/nytimes/mostpopular/
 *
 * @returns JSON top stories articles
 */
route.get('/', (req, res) => {
    mostPopular(defaultDays, (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

/**
 * Route /services/nytimes/mostpopular/{days}
 *
 * {days} = 1 / 7 / 30
 *
 * @returns JSON most popular articles {days}
 */
route.get('/:id', (req, res) => {
    mostPopular(req.params.id, (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

module.exports = route;