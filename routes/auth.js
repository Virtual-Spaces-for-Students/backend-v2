const express = require('express');
const passport = require("passport");
const router = express.Router();

/* GET users listing. */
router.get('/login', passport.authenticate('saml'));

router.post('/callback', passport.authenticate('saml', { failureRedirect: '/auth/login' }), (req, res) => {
	res.redirect(`https://app.vss.local/dashboard?token=${req.sessionID}`);
	//res.json({ sessionID: req.sessionID, user: req.user });
});


router.get('/logout', async (req, res) => {
	if (req.isAuthenticated()) {
		req.logout();
		res.sendStatus(204)
	} else {
		res.sendStatus(401);
	}
});

module.exports = router;
