const fs = require("fs");
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const SamlStrategy = require("passport-saml").Strategy;

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

passport.use(
	new SamlStrategy(
		{
			entryPoint: "https://adfs.vss.local/adfs/ls",
			issuer: "https://app.vss.local:8080",
			callbackUrl: "https://app.vss.local:8080/auth/callback",
			privateKey: fs.readFileSync("certs/adfs.key", "utf-8"),
			cert: fs.readFileSync("certs/adfs.cert", "utf-8"),
			acceptedClockSkewMs: -1,
			identifierFormat: null,
			signatureAlgorithm: "sha256",
			racComparison: "exact",
		},
		(profile, done) => {
			console.log(profile);
			return done(null, {
				upn: profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn"],
			});
		}
	)
);




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authRouter);

module.exports = app;
