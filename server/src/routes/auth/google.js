const express = require('express');
const route = express.Router();
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
route.get('/', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));

route.get('/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    passport.serializeUser( (userObj, done) => {
        done(null, userObj)
    })
    res.status(200).json({});
});

module.exports = route;