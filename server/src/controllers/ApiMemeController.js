const axios = require("axios");
const getRandomMeme = (callback) => {
    axios.get('https://meme-api.herokuapp.com/gimme/wholesomememes').then((response) => {
        callback(response.data);
    });
}

module.exports = {getRandomMeme}