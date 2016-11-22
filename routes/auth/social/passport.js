var passport = require('passport');

var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var configStrategy = require('./config.js');

var User = require('../../../models/user');

//  serialize and deserialize user instance from a session store
// http://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize#27637668
passport.serializeUser( (user, done) =>  {

  console.log('serializeUser: ' + user._id);
  done(null, user._id)

});

passport.deserializeUser( (id, done) =>  {

  User.findById( id )
    .then( user => done(null, user) )
    .catch( err => done(err, null) )

});

const handlerAuth = (accessToken, refreshToken, profile, done) => {

  const oauthID = profile.id;
  const name = profile.displayName;

	User.findOne({ oauthID })
    .then( user => {

      if (user !== null) {
        done(null, user)
      }
      else {
        user = new User({ oauthID, name, created: Date.now() })
        return user.save()
          .then( () => {
            console.log("New User detected so => saved to DB...");
            done(null, user)
          })

      }

    })
    .catch( done )

}


passport.use( new FacebookStrategy( configStrategy.facebook , handlerAuth ) );
passport.use( new TwitterStrategy( configStrategy.twitter , handlerAuth ) );
passport.use( new GithubStrategy( configStrategy.github , handlerAuth ) );
passport.use( new GoogleStrategy( configStrategy.google, handlerAuth ) );

module.exports = passport