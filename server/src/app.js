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

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});

process.on('SIGINT', () => {
    console.log("Server shutting down...");
   process.exit(0);
});