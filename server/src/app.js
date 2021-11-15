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
    apis: ["./src/routes/auth/index.js", "./src/routes/auth/google.js", "./src/routes/register/index.js", "./src/routes/auth/logout.js"],
}

const nativeAuthRoute = require('./routes/auth/index.js');
const googleAuthRoute = require('./routes/auth/google.js');
const registerRoute = require('./routes/register/index.js');
const loginRoute = require('./routes/auth/login');
const logoutRoute = require('./routes/auth/logout');
const userRoute = require('./routes/user/index.js');
const {configurePassport} = require("./services/PassportService");
const {registerGoogleUser} = require("./controllers/AuthController");

app.use(cors());
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)))

configurePassport((token, refresh, profile, done) => {
    registerGoogleUser(profile, (response) => {
        console.log(response);
        done();
    });
})

app.use("/auth/google", googleAuthRoute);
app.use("/auth", nativeAuthRoute);
app.use('/auth/register', registerRoute);
app.use('/user', userRoute);
app.use('/auth/login', loginRoute);
app.use('/auth/logout', logoutRoute);

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});

process.on('SIGINT', () => {
    console.log("Server shutting down...");
   process.exit(0);
});