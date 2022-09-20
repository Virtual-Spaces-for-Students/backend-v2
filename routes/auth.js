const express = require('express');
const passport = require("passport");
const router = express.Router();

/* GET users listing. */
router.get('/login', passport.authenticate('saml'));

router.post('/callback', passport.authenticate('saml', { failureRedirect: '/auth/login' }), (req, res) => {
	res.json({ sessionID: req.sessionID, user: req.user });
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
