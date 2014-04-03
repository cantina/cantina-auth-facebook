var app = require('cantina'),
    FacebookStrategy = require('passport-facebook').Strategy,
    url = require('url')
  , conf;

require('cantina-web');

// Default conf
app.conf.add({
  'auth-facebook': {
    successRedirect: '/',
    failureRedirect: '/',
    authURL: '/login'
  }
});

conf = app.conf.get('auth-facebook');

if (!conf.callbackURL) {
  throw new Error('You app must provide a callbackURL for facebook authentication.');
}

app.passport.use(new FacebookStrategy(conf, app.verifyFacebookUser));

app.middleware.add(conf.authURL, app.passport.authenticate('facebook', conf));
app.middleware.add(url.parse(conf.callbackURL).path, app.passport.authenticate('facebook', conf));