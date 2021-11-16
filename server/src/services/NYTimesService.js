
const apiKey = process.env.NYTIMES_API_KEY;
const axios = require('axios').default;

/**
 * Get top stories articles
 *
 * https://developer.nytimes.com/docs/top-stories-product/1/overview
 *
 * @param {*} city
 * @returns JSON
 */
const getTopStories = async (subject) => {
    const url = "https://api.nytimes.com/svc/topstories/v2/" + subject + ".json?api-key=" + apiKey;
    let data = await axios.get(url);
    return data.data;
}

/**
 * Get most popular articles
 *
 * https://developer.nytimes.com/docs/most-popular-product/1/overview
 *
 * @param {*} city
 * @returns JSON
 */
 const getMostPopular = async (days) => {
    const url = "https://api.nytimes.com/svc/mostpopular/v2/viewed/" + days + ".json?api-key=" + apiKey;
    let data = await axios.get(url);
    return data.data;
}

module.exports = {getTopStories, getMostPopular}