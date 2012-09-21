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
Your application MUST listen for the authentication events:
- `auth:serialize`
- `auth:deserialize`
- `auth-facebook:verify`

Example
-------
```js
var app = require('cantina');

app.load(function(err) {
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

  require(app.plugins.http);
  require(app.plugins.middleware);
  require('cantina-redis');
  require('cantina-session');
  require('cantina-auth');
  require('../');

  app.on('auth:serialize', function(user) {
    return user;
  });
  app.on('auth:deserialize', function(obj) {
    return obj;
  });
  app.on('auth-facebook:verify', function(token, tokenSecret, profile) {
    return profile;
  });

  app.init(function(err) {
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
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT
Copyright (C) 2012 Terra Eclipse, Inc. ([http://www.terraeclipse.com](http://www.terraeclipse.com))

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
