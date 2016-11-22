const express = require('express');
const passport = require('passport')

const router = express.Router();

const successRedirect = '/';
const scope = [ 'email', 'profile' ];
const failureRedirect = '/';

router.get( '/', passport.authenticate('google', { successRedirect, scope }) );

router.get( '/callback',
	passport.authenticate('google', { failureRedirect }), // middleware
	(req, res) => res.redirect('/account') // handler
);

module.exports = router;