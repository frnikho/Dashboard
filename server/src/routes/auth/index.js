const express = require('express');
const route = express.Router();

/**
 * @openapi
 * /auth:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
route.get('/', (req, res) => {
    res.send({hello: "world"});
})

module.exports = route;