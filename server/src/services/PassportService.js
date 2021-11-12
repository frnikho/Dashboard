const passport = require("passport");
const {OAuth2Strategy: GoogleStrategy} = require("passport-google-oauth");

const configurePassport = (callback) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    }, (token, refreshToken, profile, done) => {
        callback(token, refreshToken, profile);
    }));

}

module.exports = {configurePassport}