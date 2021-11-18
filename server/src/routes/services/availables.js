const express = require('express');
const {authorization} = require("../../middleware/AuthMiddleware");
const router = express.Router();

router.get('/', authorization, (req, res) => {

});

module.exports = router;