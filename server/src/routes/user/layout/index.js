const express = require('express');
const {authorization} = require("../../../middleware/AuthMiddleware");
const {getUserById} = require("../../../controllers/UserController");
const router = express.Router();

/**
 *  @openapi
 *  /user/layout:
 *   get:
 *     tags:
 *       - User
 *     description: User dashboard layout
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: user not found !
 */
router.get('/', authorization, (req, res) => {
    getUserById(req.user.id, (user) => {
       if (user === undefined)
           return res.status(400).json({error: 'user not found !'});
       return res.status(200).json({layout: user.layout});
    });
})

module.exports = router;