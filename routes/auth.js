const express = require('express');
const passport = require("passport");
const router = express.Router();

/* GET users listing. */
router.get('/login', passport.authenticate('saml'));

router.post('/callback',
	passport.authenticate('saml', { failureRedirect: '/auth/login' }), function (error, user, info) {
		// this will execute in any case, even if a passport strategy will find an error
		// log everything to console
		console.log(error);
		console.log(user);
		console.log(info);

		if (error) {
			res.status(401).send(error);
		} else if (!user) {
			res.status(401).send(info);
		} else {
			next();
		}

		res.status(401).send(info);
	}), (req, res) => {

}

router.get('/logout', async (req, res) => {
	if (req.isAuthenticated()) {
		req.logout();
		res.sendStatus(204)
	} else {
		res.sendStatus(401);
	}
});

module.exports = router;
