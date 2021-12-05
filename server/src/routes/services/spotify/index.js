const express = require('express');
const {authorization} = require("../../../middleware/AuthMiddleware");
const axios = require("axios");
const {getUserToken, insertUserToken, updateUserToken} = require("../../../controllers/UserTokenControll");
const router = express.Router();

const generateBase64Token = () => {
    return Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET}`).toString('base64');
}

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

/**
 *  @openapi
 *  /services/spotify:
 *   post:
 *     tags:
 *       - Services
 *     description: Spotify route
 *     responses:
 *       200:
 *         description: Successful
 *       501:
 *         description: "cannot get access_token ! check your credentials" or "cannot login to spotify !"
 */
router.post('/', authorization, (req, res) => {
    if (req.body.code === undefined || req.body.clientId)
        return res.status(400).json({error: "Invalid body code !"});

    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI)
    params.append('code', req.body.code)

    axios.post("https://accounts.spotify.com/api/token", params, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${generateBase64Token()}`
        }
    }).then(result => {
        getUserToken(req.user.id, "spotify", (token) => {
            if (token === undefined) {
                insertUserToken(req.user.id, "spotify", result.data, (data) => {
                    if (data.affectedRows === 1) {
                        return res.status(200).json({success: true, message: "you're login to spotify !"});
                    } else {
                        return res.status(501).json({success: false, message: "cannot get access_token ! check your credentials"});
                    }
                });
            } else {
                updateUserToken(req.user.id, "spotify", result.data, (data) => {
                    return res.status(200).json({success: true, message: "you're login to spotify !"});
                })
            }
        })
    }).catch((error) => {
        return res.status(501).json({error: 'cannot login to spotify !'});
    });
});

module.exports = router;