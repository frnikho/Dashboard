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
            }]
        },
        {
            name: "next_5_days_forecast",
            displayName: "Next 5 days forecast",
            description: "Get the next 5 days forecast",
            params: [{
                name: "city",
                type: "string",
            }]
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
            ]
        },
        {
            name: "is_today_a_holiday",
            displayName: "Is today a holiday ",
            description: "",
            params: [
                {
                    name: "year",
                    type: "string"
                },
                {
                    name: "month",
                    type: "string"
                },
                {
                    name: "day",
                    type: "string"
                },
            ]
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
                    list: [["1", "1"], ["7", "7"], ["30", "30"]],
                    listLabel: "Days",
                    listValue: "day"
                }
            ]
        },
        {
            name: "top_stories_articles",
            displayName: "Top stories articles",
            description: "Articles currently on the specified section",
            params: [
                {
                    name: "subject",
                    type: "list",
                    list: [["Arts", "arts"], ["Automobiles", "automobiles"], ["Books", "books"], ["Business", "business"], ["Fashion", "fashion"], ["Food", "food"], ["Health", "health"], ["Home", "home"], ["Insider", "insider"], ["Magazine", "magazine"], ["Movies", "movies"], ["Obituaries", "obituaries"], ["Opinion", "opinion"], ["Politics", "politics"], ["Realestate", "realestate"], ["Science", "science"], ["Sports", "sports"], ["Sundayreview", "sundayreview"], ["Technology", "technology"], ["Theater", "theater"], ["T-magazine", "t-magazine"], ["Travel", "travel"], ["Upshot", "upshot"], ["US", "us"], ["World", "world"]],
                    listLabel: "Subjects",
                    listValue: "subjects"
                }
            ]
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
            displayName: "Random"
        }
    ]
}]

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