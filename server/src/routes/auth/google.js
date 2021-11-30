const express = require('express');
const route = express.Router();
const cors = require('cors');
const passport = require('passport');

/**
 * @openapi
 * /auth/google:
 *   get:
 *     tags:
 *       - Auth
 *     description: Login with your google account
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Error while login
 */

const {OAuth2Client} = require('google-auth-library');
const {registerGoogleUser} = require("../../controllers/AuthController");
const jwt = require("jsonwebtoken");
const CLIENT_ID = process.env.GOOGLE_CLIENT;
const client = new OAuth2Client(CLIENT_ID);

route.post('/', ((req, res) => {
    let body = req.body;

    client.verifyIdToken({
        idToken: req.body.tokenId,
        audience: CLIENT_ID
    }).then((result) => {
        registerGoogleUser(body.profileObj, (user) => {
            if (user === null)
                return res.status(401).send({
                    error: 'Invalid user, cannot login with google !'
                });
            const token = jwt.sign({username: user.username, id: user.id}, process.env.AUTH_SECRET);
            return res.status(200).json({
                user: user,
                auth: token
            });
        });

    }).catch((error) => {
        res.status(400).send({error: "an error occurred, please try again later or contact an admin !"});
    });
}));

module.exports = route;