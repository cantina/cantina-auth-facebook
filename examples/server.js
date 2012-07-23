var cantina = require('cantina'),
    auth = require('cantina-auth'),
    plugin = require('../').plugin;

var app = cantina.createApp({
  amino: false,
  port: 3000
});

app.use(auth.plugin, {
  serializeUser: function(user, done) {
    console.log(user);
    done(null, user);
  },
  deserializeUser: function(obj, done) {
    done(null, obj);
  }
});

app.use(plugin, {
  clientID: '388250807064',
  clientSecret: '640d4fa0ff8ed12e95facddfe3b83651',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  authURL: '/login',
  scope: 'email',
  verify: function(token, tokenSecret, profile, done) {
    done(null, profile);
  }
});

app.router.get('/', function() {
  this.res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  if (this.req.isAuthenticated()) {
    this.res.end('Welcome, <a href="https://facebook.com/' + this.req.user.username + '">' + this.req.user.displayName + '</a>!');
  }
  else {
    this.res.end('<a href="/login">click here to login via Facebook</a>');
  }
});

app.start();
