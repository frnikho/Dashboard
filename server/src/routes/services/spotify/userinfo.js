const express = require('express');
const {authorization, spotifyAuth} = require("../../../middleware/AuthMiddleware");
const axios = require("axios");
const {response} = require("express");
const router = express.Router();

router.get('/', authorization, spotifyAuth, (req, res) => {
    axios.get('https://api.spotify.com/v1/me', {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${req.spotify.access_token}`,
        }
    }).then((response) => {
        res.status(200).json(response.data);
    }).catch((err) => {
        console.log(err.response);
    });
});

module.exports = router;