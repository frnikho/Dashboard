const express = require('express');
const route = express.Router();
const passport = require('passport');

route.get('/', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));

route.get('/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {

});

module.exports = route;