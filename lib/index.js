/**
 * Cantina Auth Facebook
 * ---------------------
 *
 * Facebook authentication plugin for Cantina.
 *
 * @module cantina
 * @submodule auth-facebook
 * @main auth-facebook
 */

// Modules dependencies.
var utils = require('cantina-utils');

// Export sub-modules.
utils.lazy(exports, __dirname, {
  plugin: './plugin'
});
