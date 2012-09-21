var app = require('cantina'),
    FacebookStrategy = require('passport-facebook').Strategy,
    url = require('url');

app.conf.add({
  'auth-facebook': {
    successRedirect: '/',
    failureRedirect: '/',
    authURL: '/login'
  }
});

app.on('init', function() {
  var conf = app.conf.get('auth-facebook');

  if (!conf.callbackURL) {
    throw new Error('You app must provide a callbackURL for facebook authentication.');
  }

  app.passport.use(new FacebookStrategy(conf, app.invoke.bind(app, 'auth-facebook:verify')));

  app.middleware.add(conf.authURL, app.passport.authenticate('facebook', conf));
  app.middleware.add(url.parse(conf.callbackURL).path, app.passport.authenticate('facebook', conf));
});