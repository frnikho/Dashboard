const express = require('express');
const {authorization} = require("../../middleware/AuthMiddleware");
const {getUserById} = require("../../controllers/UserController");
const route = express.Router();

/**
 * @openapi
 * /user/:id:
 *   delete:
 *     description: Delete a user
 *     responses:
 *       200:
 *         description: User deleted
 *       400:
 *         description: User cannot be deleted
 *       401:
 *         description: User not logged !
 *   get:
 *     description: Retrieve user information
 *     responses:
 *       200:
 *         description: Returns user data.
 */
route.get('/:id', authorization, (req, res) => {
    res.send({hello: "world"});

    getUserById(req.params.id, (user) => {
        if (user !== null) {

        }
    });

})

route.delete('/:id', authorization, (req, res) => {
    console.log(req.username, req.userId);
});

module.exports = route;