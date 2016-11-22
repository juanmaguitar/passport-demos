const express = require('express');
const flash = require('connect-flash');

const passport = require('../passport.js')
const User = require('../../../../models/user')
const router = express.Router();

const successRedirect = '/';
const scope = [ 'email', 'profile' ];
const failureRedirect = '/';

router.get( '/', passport.authenticate('google', { successRedirect, scope }) );

router.get( '/callback',
	passport.authenticate('google', { failureRedirect }), // middleware
	(req, res) => {
		req.flash('message', 'Login succesful!')
		res.redirect('/account') // handler
	}
);

module.exports = router;