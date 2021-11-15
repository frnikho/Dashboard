const express = require('express');
const route = express.Router();
const {topStories} = require("../../../controllers/NYTimesController");
const defaultSubject = "home";


/**
 * Route /services/nytimes/topstories/
 *
 * @returns JSON top stories articles
 */
route.get('/', (req, res) => {
    topStories(defaultSubject, (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

/**
 * Route /services/nytimes/topstories/{stories subject}
 *
 * @returns JSON top stories articles {stories subject}
 */
route.get('/:id', (req, res) => {
    topStories(req.params.id, (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

module.exports = route;