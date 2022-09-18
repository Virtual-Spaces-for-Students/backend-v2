const express = require('express');
const passport = require("passport");
const router = express.Router();

/* GET users listing. */
router.get('/login', passport.authenticate('saml'));

router.get('/callback',
	passport.authenticate('saml', { failureRedirect: '/auth/login' }),
	function(req, res) {
		// Successful authentication, redirect home.
		res.json(req.user)
	}
);

router.get('/logout', async (req, res) => {
	if (req.isAuthenticated()) {
		req.logout();
		res.sendStatus(204)
	} else {
		res.sendStatus(401);
	}
});

module.exports = router;
