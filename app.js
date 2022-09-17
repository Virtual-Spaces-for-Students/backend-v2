const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;

// 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

const app = express();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: true }
}));
app.use(passport.session());



passport.use(new OAuth2Strategy({
		authorizationURL: 'https://adfs.vss.local/adfs/oauth2/authorize',
		tokenURL: 'https://www.example.com/adfs/oauth2/token',
		clientID: "3ffad8e1-3704-4d9a-993f-00026ddd3186",
		clientSecret: "oqIbOQSD4SW1_n08m-P8DnLP2GIrwJ397mnDw9",
		callbackURL: "http://172.18.8.2:8080/auth/callback",
		scope: "openid profile email",
	},
	function(accessToken, refreshToken, profile, cb) {
		cb(null, profile);
	}
));




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authRouter);

module.exports = app;
