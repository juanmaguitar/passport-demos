module.exports = {
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:1337/auth/facebook/callback'
  },
  twitter: {
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
  },
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:1337/auth/github/callback"
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:1337/auth/google/callback'
  }
  // instagram: {
  //   clientID: 'get_your_own',
  //   clientSecret: 'get_your_own',
  //   callbackURL: 'http://127.0.0.1:1337/auth/instagram/callback'
  // }
};