const axios = require("axios");
const getRandomMeme = (callback, error) => {
    try {
        axios.get('https://meme-api.herokuapp.com/gimme/wholesomememes').then((response) => {
            callback(response.data);
        }).catch((err) => {
            error(err);
        });
    } catch (ex) {
        error(ex);
    }
}

module.exports = {getRandomMeme}