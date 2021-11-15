const jwt = require("jsonwebtoken");
const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token)
        return res.status(403).json({
            error: 'You need to be logged !'
        });
    try {
        const data = jwt.verify(token, process.env.AUTH_SECRET);
        req.username = data.username;
        req.userId = data.id;
        return next();
    } catch {
        return res.status(403).json({
            error: 'You need to be logged !'
        });
    }
}

module.exports = {authorization};