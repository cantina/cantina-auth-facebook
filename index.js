var FacebookStrategy = require('passport-facebook').Strategy,
    url = require('url');

module.exports = {
  name: 'auth-facebook',

  defaults: {
    successRedirect: '/',
    failureRedirect: '/'
  },

  init: function(app, done) {
    var conf = app.conf.get('auth-facebook');

    if (!app.verifyFacebook) {
      throw new Error('Your app must provide a verify callback for facebook authentication.');
    }
    if (!conf.callbackURL) {
      throw new Error('You app must provide a callbackURL for facebook authentication.');
    }

    app.passport.use(new FacebookStrategy(conf, app.verifyFacebook));

    if (conf.authURL) {
      app.middleware.add(conf.authURL, app.passport.authenticate('facebook', conf));
    }

    app.middleware.add(url.parse(conf.callbackURL).path, app.passport.authenticate('facebook', conf));

    done();
  }
};