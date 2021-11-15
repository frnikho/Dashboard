const express = require('express');
const jwt = require("jsonwebtoken");
const {authorization} = require("../../middleware/AuthMiddleware");
const router = express.Router();

/**
 * @openapi
 * /auth/logout:
 *  post:
 *    tags:
 *      - Auth
 *    security:
 *      - bearerAuth: []
 *    description: Logout from current session
 *    responses:
 *        200:
 *            description: Logout Successfully
 *        401:
 *            description: You need to be logged before using /logout
 *
 */
router.post('/', authorization, (req, res) => {
    return res.clearCookie("access_token")
        .status(200).json({
            message: "Successfully logged out"
        });
});

module.exports = router;