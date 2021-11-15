const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

const nativeAuthRoute = require('./routes/auth/index.js');
const googleAuthRoute = require('./routes/auth/google.js');
const registerRoute = require('./routes/register/index.js');
const openweatherCurrentWeatherRoute = require('./routes/services/OpenWeather/CurrentWeather.js');
const openweatherNext5DaysForecastRoute = require('./routes/services/OpenWeather/Next5DaysForecast.js');
const nytimesTopStories = require('./routes/services/NYTimes/NYTimesTopStories.js');
const nytimesMostPopular = require('./routes/services/NYTimes/NYTimesMostPopular.js');
const {configurePassport} = require("./services/PassportService");

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

configurePassport((token, refresh, profile) => {
    console.log(profile);
    console.log(token);
    console.log(refresh);
})

app.use("/auth/google", googleAuthRoute);
app.use("/auth", nativeAuthRoute);
app.use('/register', registerRoute);
app.use('/services/openweather/current/', openweatherCurrentWeatherRoute);
app.use('/services/openweather/next5daysforecast/', openweatherNext5DaysForecastRoute);
app.use('/services/nytimes/topstories/', nytimesTopStories);
app.use('/services/nytimes/mostpopular/', nytimesMostPopular);

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});

process.on('SIGINT', () => {
    console.log("Server shutting down...");
   process.exit(0);
});