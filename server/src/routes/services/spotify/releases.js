const express = require('express');
const {authorization, spotifyAuth} = require("../../../middleware/AuthMiddleware");
const axios = require("axios");
const router = express.Router();

/**
 *  @openapi
 *  /services/spotify/releases:
 *   get:
 *     tags:
 *       - Services
 *     description: Spotify releases
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Error
 */
router.get('/', authorization, spotifyAuth, (req, res) => {

    let url = "https://api.spotify.com/v1/browse/new-releases";

    axios.get(url, {
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