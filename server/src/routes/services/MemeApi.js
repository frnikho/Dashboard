const express = require('express');
const {authorization} = require("../../middleware/AuthMiddleware");
const {getRandomMeme} = require("../../controllers/ApiMemeController");
const router = express.Router();

router.get('', authorization, (req, res) => {
    getRandomMeme((response) => {
        return res.status(200).json(response);
    });
})

module.exports = router;