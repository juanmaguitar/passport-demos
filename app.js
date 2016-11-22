// dependencies
const fs = require('fs');
const http = require('http');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport')

var LocalStrategy = require('passport-local').Strategy;

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash');

const User = require('./models/user')

if ( fs.existsSync('.env') ) { // exists
	require('dotenv').load()
}

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// connect to the database
mongoose.connect('mongodb://localhost/passport-example');

const routerAuthGoogle = require('./routes/auth/social/google')
const routerAuthFacebook = require('./routes/auth/social/facebook')
const routerAuthGithub = require('./routes/auth/social/github')
const routerAuthTwitter = require('./routes/auth/social/twitter')

// global config
const app = express();
const PORT = process.env.PORT || 1337;


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use( logger('dev') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( cookieParser() );
app.use( session({ secret: 'supersecretworddonottelltoanyone'}) );

app.use( passport.initialize() );
app.use( passport.session() );

app.use( flash() );

//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// mongo config
// var MONGOLAB_URI= "add_your_mongolab_uri_here"
// var mongo = process.env.MONGOLAB_URI || 'mongodb://localhost/node-bootstrap3-template'

// mongoose.connect(mongo);

// mongo model
// var Model_Name = require('add_your_models_here');



// routes
app.get('/', (req, res) =>  res.render('index') );
//app.get('/ping', routes.ping);

app.get('/account', isAuthenticated, (req, res) => {

	const userId = req.session.passport.user;
	const message = req.flash('message');

	User.findById( userId )
		.then( user => res.render( 'account', { user, message } ) )
		.catch( console.log )

  //res.render('account', { user: JSON.stringify(req.user) });
});

// app.get('/', function(req, res){
//   res.render('login', { user: req.user });
// });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.use('/auth/google', routerAuthGoogle)
app.use('/auth/facebook', routerAuthFacebook)
app.use('/auth/github', routerAuthGithub)
app.use('/auth/twitter', routerAuthTwitter)

// run server
app.listen( PORT, () => console.log(`Listening on port ${PORT}...`) );

// test authentication
function isAuthenticated(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/');
}

module.exports = app;
