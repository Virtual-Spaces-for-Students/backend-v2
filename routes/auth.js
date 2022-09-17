const express = require('express');
const passport = require("passport");
const router = express.Router();

/* GET users listing. */
router.get('/login', passport.authenticate('oauth2'));

module.exports = router;
