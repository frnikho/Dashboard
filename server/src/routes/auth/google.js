const express = require('express');
const route = express.Router();
const passport = require('passport');

/**
 * @openapi
 * /auth/google:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
route.get('/', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));

route.get('/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {

    passport.serializeUser( (userObj, done) => {
        console.log(userObj);
        done(null, userObj)
    })

    res.status(200).json({});
});

module.exports = route;