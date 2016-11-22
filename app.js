// dependencies
var fs = require('fs');
var http = require('http');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var mongoose = require('mongoose');
const passport = require('passport')

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const session = require('express-session')

require('dotenv').config()

const routerAuthGoogle = require('./routes/auth/google')
const routerAuthFacebook = require('./routes/auth/facebook')
const routerAuthGithub = require('./routes/auth/github')
const routerAuthTwitter = require('./routes/auth/twitter')

// global config
const app = express();
const PORT = process.env.PORT || 1337;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use( logger('dev') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( cookieParser() );
app.use( session({secret: 'anything'}) );

app.use( passport.initialize() );
app.use( passport.session() );

//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// mongo config
// var MONGOLAB_URI= "add_your_mongolab_uri_here"
// var mongo = process.env.MONGOLAB_URI || 'mongodb://localhost/node-bootstrap3-template'

// mongoose.connect(mongo);

// mongo model
// var Model_Name = require('add_your_models_here');

// routes
app.get('/', routes.index);
//app.get('/ping', routes.ping);

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: JSON.stringify(req.user) });
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
function ensureAuthenticated(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/');
}

module.exports = app;
