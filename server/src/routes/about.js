const express = require('express');
const router = express.Router();

let services = [{
    name: "Weather",
    imageLink: "public/rainy-day.png",
    description: "Retrieve weather and forecast information with OpenWeather",
    widgets: [
        {
            name: "city_temperature",
            displayName: "Temperature By City",
            description: "Get the city temperature",
            params: [{
                name: "city",
                type: "string"}]
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
        name: "Calendrafic",
        imageLink: "public/calendar.png",
        description: "Powered by Calendrafic",
        widgets: [
            {
                name: "holiday_of_year",
                displayName: "Holiday of year",
                description: "",
                params: [{
                    name: "day",
                    type: "string"
                }]
            }
        ]
    },
    {
        name: "Ney York Times",
        imageLink: "public/newspaper.png",
        description: "New York Times articles",
        widgets: [
            {
                name: ""
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