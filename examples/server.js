var app = require('cantina');

app.boot(function(err) {
  if (err) return console.error(err);

  app.conf.set('http', { port: 3000 });
  app.conf.set('auth-facebook', {
    clientID: '388250807064',
    clientSecret: '640d4fa0ff8ed12e95facddfe3b83651',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    authURL: '/login',
    scope: 'email'
  });

  app.serializeUser = function(user, cb) {
    return cb(null, user);
  };
  app.deserializeUser = function(obj, cb) {
    return cb(null, obj);
  };
  app.verifyFacebookUser = function(token, tokenSecret, profile, done) {
    return done(null, profile);
  };

  require('cantina-web');
  require('cantina-redis');
  require('cantina-session');
  require('cantina-auth');
  require('../');

  app.start(function(err) {
    if (err) return console.error(err);

    app.middleware.get('/', function index(req, res) {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      if (req.isAuthenticated()) {
        res.end('Welcome, <a href="https://facebook.com/' + req.user.username + '">' + req.user.displayName + '</a>!');
      }
      else {
        res.end('<a href="/login">click here to login via Facebook</a>');
      }
    });
  });
});
