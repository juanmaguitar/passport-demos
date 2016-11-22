const express = require('express');
const passport = require('passport');
const Account = require('../../../models/account');

const router = express.Router();

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {

  const username = req.body.username;
  const password = req.body.password;

  Account.register( new Account({ username }), password, (err, account) => {
      if (err) return res.render('register', { account : account });
      passport.authenticate('local')(req, res, () =>  res.redirect('/') );
  });

});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.send("pong!", 200);
});

module.exports = router