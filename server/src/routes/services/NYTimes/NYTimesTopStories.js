const express = require('express');
const route = express.Router();
const {topStories} = require("../../../controllers/NYTimesController");
const {authorization} = require("../../../middleware/AuthMiddleware");
const defaultSubject = "home";

/**
 * @openapi
 * /services/nytimes/topstories/:
 *   get:
 *     tags:
 *       - Services
 *     description: Get the top stories
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Error
 *       401:
 *         description: User not logged !
 *  @openapi
 *  /services/nytimes/topstories/{subject}:
 *   get:
 *     tags:
 *       - Services
 *     description: Get the top stories of subject x
 *     parameters:
 *       - in: path
 *         name: subject
 *         schema:
 *           type: string
 *         required: true
 *         description: top stories subject
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Error
 *       401:
 *         description: User not logged !
 */

/**
 * Route /services/nytimes/topstories/
 *
 * @returns JSON top stories articles
 */
route.get('/', authorization, (req, res) => {
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
route.get('/:id', authorization, (req, res) => {
    topStories(req.params.id, (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

module.exports = route;