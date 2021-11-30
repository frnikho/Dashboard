const jwt = require("jsonwebtoken");
const {getUserById} = require("../controllers/UserController");

/**
 * Check if the user is logged and get his information
 * @param req ExpressRequest
 * @param res ExpressResponse
 * @param next next Express middleware function
 * @returns {*} nothing
 */
const authorization = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token === undefined) {
        return res.status(401).json({
            error: 'You need to be logged !'
        });
    }
    token = token.substring(7, token.length);
    if (!token)
        return res.status(401).json({
            error: 'You need to be logged !'
        });
    try {
        const data = jwt.verify(token, process.env.AUTH_SECRET);
        req.username = data.username;
        req.userId = data.id;

        getUserById(data.id, (user) => {
            if (user !== undefined) {
                req.user = user;
                next();
            } else {
                return res.status(401).json({
                    error: 'You need to be logged !'
                });
            }
        })

    } catch {
        return res.status(401).json({
            error: 'You need to be logged !'
        });
    }
}

module.exports = {authorization};