cantina-auth-facebook
=====================

Facebook authentication for Cantina.

Dependencies
------------
- **auth** - Authentication support provided by [cantina-auth](https://github.com/cantina/cantina-auth)

Adds Middleware
---------------
- Facebook authentication middleware under the `authURL` route.

Configuration
-------------
- **successRedirect** - Where to redirect after the authentication succeeds.
- **failureRedirect** - Where to redirect if the authentication fails.
- **clientID** - Facebook app client id.
- **clientSecret** - Facebook app client secret.
- **callbackURL** - Callback URL (publicly accessible) for authentication.
- **authURL** - A path to initiation the authentication process.
- **scope** - ?

**Defaults**
```js
{
  'auth-facebook': {
    successRedirect: '/',
    failureRedirect: '/',
    authURL: '/login'
  }
}
```

Usage
-----
Your application MUST provide handlers for serializing, deserializing, and verifying users.
- `app.serializeUser`
- `app.deserializeUser`
- `app.verifyFacebookUser`

Example
-------
```js
var app = require('cantina');

app.boot(function(err) {
  if (err) return console.error(err);

  app.conf.add({
    'auth-facebook': {
      clientID: 'your id here',
      clientSecret: 'your secret here',
      callbackURL: 'http://mydomain.com/auth/facebook/callback',
      authURL: '/login/facebook',
      scope: 'email'
    }
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
        res.end('<a href="/login/facebook">click here to login via Facebook</a>');
      }
    });
  });
});
```

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Santa Cruz, CA and Washington, D.C.
