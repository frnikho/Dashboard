const express = require('express');
const {loginUser} = require("../../controllers/AuthController");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const router = express.Router();

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
        return res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        }).status(200).json({
            user: user,
            token: token
        });
    });
});

module.exports = router;