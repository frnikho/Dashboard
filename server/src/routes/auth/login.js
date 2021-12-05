const express = require('express');
const {loginUser} = require("../../controllers/AuthController");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const router = express.Router();

/**
 *  @openapi
 *  /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Login user
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Required fields password and username !
 *       401:
 *         description: Invalid user or password !
 */
router.post('/', (req, res) => {

    if (!req.body.password || !req.body.username)
        return res.status(400).send({
            error: 'Required fields password and username !'
        });

    loginUser(req.body.username, req.body.password, (user) => {
        if (user === null)
            return res.status(401).send({
                error: 'Invalid user or password !'
            });
        const token = jwt.sign({username: user.username, id: user.id}, process.env.AUTH_SECRET);
        return res.status(200).json({
            user: user,
            auth: token
        });
    });
});

module.exports = router;