const express = require('express');
const router = express.Router();

let services = [{
    name: "Weather",
    imageLink: "public/rainy-day.png",
    description: "Retrieve weather and forecast information with OpenWeather",
    widgets: [
        {
            name: "city_temperature",
            displayName: "City weather",
            description: "Get the city weather",
            params: [{
                name: "city",
                type: "string"
            }],
            timer: {
                min: 300,
                max: 3600*24
            }
        },
        {
            name: "next_5_days_forecast",
            displayName: "Next 5 days forecast",
            description: "Get the next 5 days forecast",
            params: [{
                name: "city",
                type: "string",
            }],
            timer: {
                min: 60,
                max: 300
            }
        }
    ]
},
{
    name: "Calendarific",
    imageLink: "public/calendar.png",
    description: "Powered by Calendarific",
    widgets: [
        {
            name: "holiday_of_year",
            displayName: "Holiday of year",
            description: "",
            params: [
                {
                    name: "year",
                    type: "string"
                }
            ],
            timer: {
                min: 86400, // 24 h
                max: 31536000 // seconde dans l'année
            }
        },
        {
            name: "is_today_a_holiday",
            displayName: "Is today a holiday ",
            description: "",
            params: [
                {
                    name: "date",
                    type: "datepicker",
                    dateLabel: "Date",
                }
            ],
            timer: {
                min: 3600, // 1 h
                max: 86400 // 24 h
            }
        }
    ]
},
{
    name: "New York Times",
    imageLink: "public/newspaper.png",
    description: "New York Times articles",
    widgets: [
        {
            name: "most_popular_articles",
            displayName: "Most popular articles",
            description: "Most popular articles based on views",
            params: [
                {
                    name: "days",
                    type: "list",
                    list: [["1", "1 day"], ["7", "7 days"], ["30", "30 days"]],
                    listLabel: "Days",
                }
            ],
            timer: {
                min: 300, // 5min
                max: 86400 // 24 h
            }
        },
        {
            name: "top_stories_articles",
            displayName: "Top stories articles",
            description: "Articles currently on the specified section",
            params: [
                {
                    name: "subject",
                    type: "list",
                    list: [["arts", "Arts"], ["automobiles", "Automobiles"], ["books", "Books"], ["business", "Business"], ["fashion", "Fashion"], ["food", "Food"], ["health", "Health"], ["home", "Home"], ["insider", "Insider"], ["magazine", "Magazine"], ["movies", "Movies"], ["obituaries", "Obituaries"], ["opinion", "Opinion"], ["politics", "Politics"], ["realestate", "Realestate"], ["science", "Science"], ["sports", "Sports"], ["sundayreview", "Sundayreview"], ["technology", "Technology"], ["theater", "Theater"], ["t-magazine", "T-magazine"], ["travel", "Travel"], ["upshot", "Upshot"], ["uS", "US"], ["world", "World"]],
                    listLabel: "Subjects",
                }
            ],
            timer: {
                min: 300, // 5 min
                max: 86400 // 24 h
            }
        }
    ]
},
{
    name: "Meme",
    description: "Get a random meme",
    imageLink: "public/meme.png",
    widgets: [
        {
            name: "random_meme",
            description: "Get a random meme",
            params: [],
            displayName: "Random",
            timer: {
                min: 5, // 5 second
                max: 3600 // 1 min
            }
        }
    ]
},
{
    name: "Spotify",
    description: "Get spotify music information",
    imageLink: "public/spotify.png",
    widgets: [
        {
            name: "user_information",
            displayName: "Get user information",
            description: "Get user information",
            params: [
                {
                    name: "Login with Spotify",
                    type: "oauth2",
                    service: "spotify",
                }
            ],
            timer: {
                min: 60, // 60 second
                max: 3600 // 1 min
            }
        },
        {
            name: "spotify_player_control",
            displayName: "Control Spotify player",
            description: "Show you a remote control for Spotify player",
            params: [
                {
                    name: "Login with spotify",
                    type: "oauth2",
                    service: "spotify",
                },
                {
                    name: "advanced_mod",
                    type: "checkbox"
                }
            ],
            timer: {
                min: 1, // 1 second
                max: 60 // 1 min
            }
        },
        {
            name: "spotify_new_releases",
            displayName: "New releases",
            description: "Get new releases from Spotify artists",
            timer: {
                min: 60, // 1 min
                max: 3600 // 1 h
            },
            params: [
                {
                    name: "country",
                    type: "list",
                    list: [["FR", "France"], ["US", "USA"], ["BE", "Belgium"]],
                    listLabel: "Countries",
                }
            ]
        }
    ]
}]

/**
 *  @openapi
 *  /about.json:
 *   get:
 *     tags:
 *       - Info
 *     description: Server info, Services & Widgets info
 *     responses:
 *       200:
 *         description: Successful
 */
router.all('/', (req, res) => {
    let clientHost = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    let secondsSinceEpoch = Math.round(Date.now() / 1000)

    res.status(200).json({
        client: {
            host: clientHost
        },
        server: {
            current_time: secondsSinceEpoch,
            services: services
        }
    });
})

module.exports = router;