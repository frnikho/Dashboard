const express = require('express');
const {getUserWidgetsConfig, updateUserWidgetsConfig} = require("../../../controllers/WidgetController");
const {authorization} = require("../../../middleware/AuthMiddleware");
const router = express.Router();

/**
 * @openapi
 * /widgets/config:
 *  patch:
 *    tags:
 *      - Widgets
 *    description: Update user widgets config
 *    consumes:
 *      - application/json
 *    requestBody:
 *      description: widgets settings
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              current_weather:
 *                type: object
 *                default: {}
 *              next_5_days_forecast:
 *                type: object
 *                default: {}
 *    responses:
 *        200:
 *            description: Successful request
 *        400:
 *            description: An error occurred
 *        401:
 *            description: User not logged
 *        403:
 *            description: Unauthorized
 * @openapi
 * /widgets/config:
 *  get:
 *    tags:
 *      - Widgets
 *    description: Get user widgets config
 *    consumes:
 *      - application/json
 *    responses:
 *        200:
 *            description: Successful request
 *        400:
 *            description: An error occurred
 *        401:
 *            description: User not logged
 *        403:
 *            description: Unauthorized
 */

router.patch('/', authorization, (req, res) => {
    getUserWidgetsConfig(req.userId, (config) => {
        config.data[req.body.widget] = req.body.data;
        console.log(config.data);
        updateUserWidgetsConfig(req.userId, config.data, (response) => {
            res.status(200).send({});
        });
    });
})

router.get('/', authorization, (req, res) => {
    getUserWidgetsConfig(req.user.id, (config) => {
        return res.status(200).json(config);
    })
})

module.exports = router;