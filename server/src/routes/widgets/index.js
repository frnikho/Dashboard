const express = require('express');
const {authorization} = require("../../middleware/AuthMiddleware");
const {updateUserLayout, deleteUserWidget} = require("../../controllers/UserController");
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

router.delete('/', authorization, (req, res) => {
   if (req.body.widgetIndex === undefined)
       return res.status(400).json({error: 'invalid request body !'});
    deleteUserWidget(req.user.id, req.user.layout, req.body.widgetIndex, (data) => {
        return res.status(200).json({});
    });
});

router.post('/', authorization, (req, res) => {
    req.user.layout.push({
        type: req.body.widget,
        id: req.body.number
    });
    updateUserLayout(req.user.id, req.user.layout, (response) => {
        res.status(200).json({
            type: req.body.widget,
            id: req.body.number
        });
    });
});

module.exports = router;