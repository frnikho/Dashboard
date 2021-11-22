const express = require('express');
const {getUserWidgetsConfig, updateUserWidgetsConfig} = require("../../../controllers/WidgetController");
const {authorization} = require("../../../middleware/AuthMiddleware");
const router = express.Router();

router.patch('/', authorization, (req, res) => {
    getUserWidgetsConfig(req.userId, (config) => {
        config.data[req.body.widget] = req.body.data;
        updateUserWidgetsConfig(req.userId, config.data, (response) => {
            console.log(response);
            res.status(200).send({});
        });
    });
})

router.get('/', (req, res) => {

})

module.exports = router;