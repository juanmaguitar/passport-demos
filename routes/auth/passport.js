var passport = require('passport');

var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var configStrategy = require('./config.js');

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

const handlerAuth = (accessToken, refreshToken, profile, done) => {
  process.nextTick( () => done(null, profile) )
}

passport.use( new FacebookStrategy( configStrategy.facebook , handlerAuth ) );
passport.use( new TwitterStrategy( configStrategy.twitter , handlerAuth ) );
passport.use( new GithubStrategy( configStrategy.github , handlerAuth ) );

const handlerAuthGoogle = (req, accessToken, refreshToken, profile, done) => {
  process.nextTick( () => done(null, profile) )
}

passport.use( new GoogleStrategy( configStrategy.github, handlerAuthGoogle ) );

module.exports = passport;