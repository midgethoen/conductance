require('../hub.sjs');
var Url = require('sjs:url');
var http = require('sjs:http');
var logging = require('sjs:logging');
var { isBrowser } = require('sjs:test/suite');

var host = null;
var prefix = isBrowser ? (Url.normalize('../', module.id) .. Url.parse()).path : '/';

exports.getRoot = function() {
  if(!host && !isBrowser) throw new Error("Host not yet set");
  return Url.normalize(prefix, host);
};
exports.setHost = h -> host = h;

exports.url = u -> Url.normalize(u, exports.getRoot());

exports.serve = function(config, block) {
  var port = config.address.port;
  var base_url = 'http://localhost:' + port + '/';
  exports.setHost(base_url);

  var isRunning = function() {
    try {
      http.get(base_url);
      return true;
    } catch (e) {
      if(e.toString().indexOf('ECONNREFUSED') == -1) {
        // this is not the error we expected!
        throw(e);
      }
      return false;
    }
  };

  if (isRunning()) {
    // no need to start or stop
    console.warn("using existing server on #{port}");
    return block();
  }

  require('mho:server').run(config, block);
}
