const express = require('express');
const router = express.Router();

let services = [
    {
        name: "Weather",
        widgets: [{
            name: "city_temperature",
            description: "Get the city temperature",
            params: [{
                name: "city",
                type: "string"
            }]
        }]
    },
    {
        name: "Nasa",
        widgets: [
            {
                name: ""
            }
        ]
    },
    {
        name: "Ney York Times",
        widgets: [
            {
                name: ""
            }
        ]
    }
]

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