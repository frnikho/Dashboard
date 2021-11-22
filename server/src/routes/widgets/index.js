const express = require('express');
const {authorization} = require("../../middleware/AuthMiddleware");
const {updateUserLayout} = require("../../controllers/UserController");
const router = express.Router();

/**
 * @openapi
 * /widgets:
 *  get:
 *    tags:
 *      - Widgets
 *    description: Get user widget layout
 *    consumes:
 *      - application/json
 *    responses:
 *        200:
 *            description: Timers settings updated
 *        400:
 *            description: An error occurred, bad json body
 *        401:
 *            description: User not logged
 *        403:
 *            description: Unauthorized
 */

router.post('/', authorization, (req, res) => {
    console.log(req.user);
    req.user.layout.push(req.body.widget);
    updateUserLayout(req.user.id, req.user.layout, (response) => {
        res.status(200).json({ok: "ok"});
    });
});

module.exports = router;