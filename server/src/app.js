const express = require('express')
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "Dashboard API Swagger",
            version: "0.1",
            description:
                "Hello World",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Hello",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        basePath: '/',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    name: "access_token"
                }
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:8080/",
            }
        ],
    },
    apis: ["./src/routes/auth/google.js", "./src/routes/register/index.js", "./src/routes/auth/logout.js",
    "./src/routes/user/index.js", "./src/routes/timer/index.js", "./src/routes/services/Calendarific/HolidayOfYear.js", "./src/routes/services/Calendarific/IsTodayAHoliday.js",
    "./src/routes/services/OpenWeather/CurrentWeather.js", "./src/routes/services/OpenWeather/Next5DaysForecast.js", "./src/routes/services/NYTimes/NYTimesMostPopular.js",
        "./src/routes/services/NYTimes/NYTimesTopStories.js", "./src/routes/widgets/config/index.js", "./src/routes/widgets/index.js"],
}

app.use(cors({
    origin: '*',
}));

const googleAuthRoute = require('./routes/auth/google.js');
const registerRoute = require('./routes/register/index.js');
const loginRoute = require('./routes/auth/login');
const logoutRoute = require('./routes/auth/logout');
const userRoute = require('./routes/user/index.js');
const aboutRoute = require('./routes/about');
const timersRoute = require('./routes/timer/index');

const openWeatherCurrentWeatherRoute = require('./routes/services/OpenWeather/CurrentWeather.js');
const openWeatherNext5DaysForecastRoute = require('./routes/services/OpenWeather/Next5DaysForecast.js');

const nytimesTopStories = require('./routes/services/NYTimes/NYTimesTopStories.js');
const nytimesMostPopular = require('./routes/services/NYTimes/NYTimesMostPopular.js');

const calendarIsTodayAHoliday = require('./routes/services/Calendarific/IsTodayAHoliday.js');
const calendarHolidayOfYear = require('./routes/services/Calendarific/HolidayOfYear.js');

const memeRoute = require('./routes/services/MemeApi');

const widgetsConfigRoute = require('./routes/widgets/config');
const widgetsRoute = require('./routes/widgets');

const userLayoutRoute = require('./routes/user/layout/index');

const {configurePassport} = require("./services/PassportService");
const {registerGoogleUser} = require("./controllers/AuthController");

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options), {
    customSiteTitle: 'Dashboard API - Documentation',
    customfavIcon: '../assets/dashboard.ico'
}))

app.set('trust proxy', true);

configurePassport((token, refresh, profile, done) => {
    registerGoogleUser(profile, (response) => {
        return done(response);
    });
})

app.use("/auth/google", googleAuthRoute);
app.use('/auth/register', registerRoute);
app.use('/user/layout', userLayoutRoute);
app.use('/user', userRoute);
app.use('/auth/login', loginRoute);
app.use('/auth/logout', logoutRoute);

app.use('/timers', timersRoute);

app.use('/about.json', aboutRoute);

app.use('/services/openweather/current/', openWeatherCurrentWeatherRoute);
app.use('/services/openweather/next5daysforecast/', openWeatherNext5DaysForecastRoute);
app.use('/services/nytimes/topstories/', nytimesTopStories);
app.use('/services/nytimes/mostpopular/', nytimesMostPopular);
app.use('/services/calendar/istodayaholiday/', calendarIsTodayAHoliday);
app.use('/services/calendar/holidayofyear/', calendarHolidayOfYear);

app.use('/services/meme/', memeRoute);

app.use('/widgets/', widgetsRoute);
app.use('/widgets/config', widgetsConfigRoute);

app.use('/public', express.static('public'));

app.use('/', (req, res) => {
    res.redirect('/docs');
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});

process.on('SIGINT', () => {
    console.log("Server shutting down...");
    process.exit(0);
});