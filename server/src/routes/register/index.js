const express = require('express');
const {registerUser} = require("../../controllers/AuthController");
const route = express.Router();

/**
 * @openapi
 * /auth/register:
 *  post:
 *    tags:
 *      - Auth
 *    description: Register new user
 *    consumes:
 *      - application/json
 *    requestBody:
 *      description: the user to create.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *        200:
 *            description: Created
 *        400:
 *            description: An error occurred, maybe the username are already taken, see error json message
 *
 */
route.post('/', (req, res) => {
    if (!req.body || !req.body.username || !req.body.password)
        return res.status(400).send({error: "missing username and password fields !"});
    registerUser(req.body.username, req.body.password, (user) => {
        return res.status(200).send(user);
    }, (msg) => {
        return res.status(400).send({error: msg});
    })
});

module.exports = route;