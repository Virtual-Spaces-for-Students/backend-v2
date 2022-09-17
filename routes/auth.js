const express = require('express');
const passport = require("passport");
const router = express.Router();

/* GET users listing. */
router.get('/login', passport.authenticate('oauth2'));

router.get('/callback',
	passport.authenticate('oauth2', { failureRedirect: '/login' }),
	function(req, res) {
		// Successful authentication, redirect home.
		res.json(req.user)
	}
);
module.exports = router;
