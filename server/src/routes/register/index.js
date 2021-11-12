const express = require('express');
const {checkUsernameValidity, registerUser} = require("../../controllers/AuthController");
const route = express.Router();

route.post('/', (req, res) => {
    if (!req.body || !req.body.username || !req.body.password)
        return res.status(400).send({error: "missing username and password fields !"});

    registerUser(req.body.username, req.body.password, (user) => {
        return res.status(200).send({data: user});
    }, (msg) => {
        return res.status(400).send({error: msg});
    })
});

module.exports = route;