const express = require('express');
const passport = require('../passport.js')

const router = express.Router();

const failureRedirect = '/';

router.get( '/',
	passport.authenticate('twitter'),
	(req, res) => {} // handler
);

router.get( '/callback',
	passport.authenticate('twitter', { failureRedirect }), // middleware
	(req, res) => res.redirect('/account') // handler
);

module.exports = router;