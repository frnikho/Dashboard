const express = require('express');
const {authorization} = require("../../middleware/AuthMiddleware");
const {updateTimerSettings, DEFAULT_CURRENT_WEATHER, DEFAULT_NEXT_5_DAYS_FORECAST} = require("../../controllers/ConfigController");
const router = express.Router();

/**
 * @openapi
 * /timers:
 *  patch:
 *    tags:
 *      - Config
 *    description: Settings widgets timers
 *    consumes:
 *      - application/json
 *    requestBody:
 *      description: timers settings
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              current_weather:
 *                type: int
 *                default: 30
 *                minimum: 5
 *                maximum: 3600
 *              next_5_days_forecast:
 *                type: int
 *                default: 30
 *                minimum: 5
 *                maximum: 3600
 *    responses:
 *        200:
 *            description: Timers settings updated
 *        400:
 *            description: An error occurred, bad json body
 *        401:
 *            description: User not logged
 *        403:
 *            description: Unauthorized
 *
 */

const wrongBody = (req, res, message) => {
    return res.status(400).json({
        error: message,
        links: 'http://localhost:8080/docs/#/Config/patch_timers'
    });
}

router.patch('/', authorization, (req, res) => {
    let [currentWeatherTimers, next5DaysForecastTimers] = [req.body['current_weather'], req.body['next_5_days_forecast']];

    if (currentWeatherTimers === undefined && next5DaysForecastTimers === undefined)
        return res.status(400).json({
            error: 'Invalid json body !',
            links: 'http://localhost:8080/docs/#/Config/patch_timers'
        });

    if (currentWeatherTimers <= 5 || next5DaysForecastTimers <= 5) {
        return wrongBody(req, res, 'timers must be > 5 seconds');
    } else if (currentWeatherTimers >= 3600 || next5DaysForecastTimers >= 3600) {
        return wrongBody(req, res, 'timers must be < 3600 seconds');
    }

    updateTimerSettings(req.user.id, currentWeatherTimers || DEFAULT_CURRENT_WEATHER, next5DaysForecastTimers || DEFAULT_NEXT_5_DAYS_FORECAST, (rows) => {
        if (rows.affectedRows === 1) {
            res.status(200).json({});
        } else {
            res.status(400).json({
                error: 'Cannot update timers !',
                links: 'http://localhost:8080/docs/#/Config/patch_timers'
            });
        }
    });

})

module.exports = router;