const {getTopStories, getMostPopular} = require('../services/NYTimesService');

/**
 * Top stories articles
 *
 * @param {*} subject - default subject = home
 * @param {*} callback
 * @param {*} error
 */
const topStories = (subject, callback, error) => {
    getTopStories(subject).then((data) => {
        callback(data);
    }).catch(() => {
        error("Error to get top stories articles on '" + subject + "' subject");
    })
}


/**
 * Most popular articles
 *
 * @param {*} days - default day = 1
 * @param {*} callback
 * @param {*} error
 */
 const mostPopular = (days, callback, error) => {
    getMostPopular(days).then((data) => {
        callback(data);
    }).catch(() => {
        error("Error to get most popular articles on '" + days + "' days");
    })
}


module.exports = {topStories, mostPopular}