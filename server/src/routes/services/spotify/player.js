const express = require('express');
const {authorization, spotifyAuth} = require("../../../middleware/AuthMiddleware");
const axios = require("axios");
const {response} = require("express");
const router = express.Router();

router.get('/', authorization, spotifyAuth, (req, res) => {
    axios.get('https://api.spotify.com/v1/me/player', {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${req.spotify.access_token}`,
        }
    }).then((response) => {
        return res.status(200).json(response.data);
    }).catch(err => {
        return res.status(400).json({});
    });
});

router.post('/', authorization, spotifyAuth, (req, res) => {
    if (req.body.control === undefined)
        return res.status(400).json({error: 'invalid control !'});
    let action = req.body.control;
    let client;
    const options = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${req.spotify.access_token}`,
        }
    }
    if (action === 'next' || action === 'previous') {
        client = axios.post(`https://api.spotify.com/v1/me/player/${action}`, {}, options);
    } else if (action === 'shuffle' || action === 'repeat') {
        console.log(req.body.state);
        client = axios.put(`https://api.spotify.com/v1/me/player/${action}?state=${req.body.state}`, {}, options);
    } else {
        client = axios.put(`https://api.spotify.com/v1/me/player/${action}`, {}, options);
    }

    client.then(() => {
        return res.status(200).json({});
    }).catch((err) => {
        console.log(err.response.data);
        return res.status(400).json({});
    });

});

module.exports = router;