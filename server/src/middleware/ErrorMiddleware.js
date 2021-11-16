/**
 * Return a bad method response to the client
 * @param req ExpressRequest
 * @param res ExpressResponse
 * @returns {*} nothing
 */
const wrongMethod = (req, res) => {
    return res.status(400).json({
        message: 'bad method !'
    });
}

module.exports = {wrongMethod}