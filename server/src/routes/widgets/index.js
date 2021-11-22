const express = require('express');
const {authorization} = require("../../middleware/AuthMiddleware");
const {updateUserLayout} = require("../../controllers/UserController");
const router = express.Router();

router.post('/', authorization, (req, res) => {
    console.log(req.user);
    req.user.layout.push(req.body.widget);
    updateUserLayout(req.user.id, req.user.layout, (response) => {
        res.status(200).json({ok: "ok"});
    });
});

module.exports = router;