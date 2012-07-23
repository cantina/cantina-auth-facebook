/**
 * Facebook authentication provider plugin.
 *
 * @module cantina
 * @submodule auth-facebook
 */

// Module dependencies.
var utils = require('cantina-utils'),
    FacebookStrategy = require('passport-facebook').Strategy;

// Expose this service's package info.
utils.pkginfo(module);

/**
 * @method attach
 * @param optons {Object} Plugin options.
 */
module.exports.attach = function(options) {
  this.passport.use(new FacebookStrategy(options, options.verify));
  this.utils.defaults(options, {
    successRedirect: '/',
    failureRedirect: '/'
  });

  if (options.authURL) {
    this.middleware(options.authURL, this.passport.authenticate('facebook'));
  }
  this.middleware(options.callbackURL, this.passport.authenticate('facebook', options));
};
