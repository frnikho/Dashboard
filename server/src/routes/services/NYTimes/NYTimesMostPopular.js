const express = require('express');
const route = express.Router();
const {mostPopular} = require("../../../controllers/NYTimesController");
const {authorization} = require("../../../middleware/AuthMiddleware");
const defaultDays = 1;

/**
 * @openapi
 * /services/nytimes/mostpopular/:
 *   get:
 *     tags:
 *       - Services
 *     description: Get the most popular article from NYT
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Cannot get most popular article
 *       401:
 *         description: User not logged !
 *  @openapi
 *  /services/nytimes/mostpopular/{days}:
 *   get:
 *     tags:
 *       - Services
 *     description: Get the most popular article of day x
 *     parameters:
 *       - in: path
 *         name: days
 *         schema:
 *           type: string
 *         required: true
 *         description: 1 - 7 - 30
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Cannot get most popular article of day x
 *       401:
 *         description: User not logged !
 */

/**
 * Route /services/nytimes/mostpopular/
 *
 * @returns JSON most popular articles
 */
route.get('/', authorization, (req, res) => {
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
route.get('/:id', authorization, (req, res) => {
    mostPopular(req.params.id, (data) => {
        res.status(200).send(data);
    }, (errorMsg) => {
        res.status(400).send({error: errorMsg})
    })
});

module.exports = route;