const express = require('express');
const {authorization} = require("../../middleware/AuthMiddleware");
const {getUserById} = require("../../controllers/UserController");
const {wrongMethod} = require("../../middleware/ErrorMiddleware");
const route = express.Router();

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     tags:
 *       - User
 *     description: Delete a user
 *     responses:
 *       200:
 *         description: User deleted
 *       400:
 *         description: User cannot be deleted
 *       401:
 *         description: User not logged !
 *   get:
 *     tags:
 *       - User
 *     description: Retrieve user information
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: Returns user data.
 *       400:
 *         description: Invalid user id
 *       401:
 *         description: User not logged
 *       403:
 *         description: Unauthorized
 *   patch:
 *     tags:
 *       - User
 *     description: Update user information
 *     responses:
 *       200:
 *         description: User information saved
 *       400:
 *         description: Invalid body or unknown user
 *       401:
 *         description: User not logged
 *       403:
 *         description: Unauthorized
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

route.patch('/:id', authorization, (req, res) => {

});

route.all('/:id', wrongMethod);

module.exports = route;