const express = require('express');
const {authorization} = require("../../middleware/AuthMiddleware");
const {getRandomMeme} = require("../../controllers/ApiMemeController");
const router = express.Router();

router.get('', authorization, (req, res) => {
    getRandomMeme((response) => {
        return res.status(200).json(response);
    }, (error) => {
        return res.status(400).json(error);
    });
})

module.exports = router;