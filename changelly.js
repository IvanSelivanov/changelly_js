'use strict';
module.exports = (function() {
  const URL = 'https://api.changelly.com';
  const io = require('socket.io-client');
  const crypto = require('crypto');

  function Changelly(apiKey, apiSecret) {

    this._sign = function(message) {
      return crypto
        .createHmac('sha512', apiSecret)
        .update(JSON.stringify(message))
        .digest('hex');
    };
       
    var self = this;
    
    this._socket = io.connect(URL, {
      'reconnection': true,
      'reconnectionDelay': 1000,
      'reconnectionDelayMax': 5000,
      'reconnectionAttempts': 'Infinity'
    });

    this._socket.on('connect', function() {
      var message = {
        "Login": {}
      };

      self._socket.emit('subscribe',
        {
          apiKey: apiKey,
          sign: self._sign(message),
          message: message
        }
      );
    });
  }
  
  Changelly.prototype = {
    on: function(channel, callback) {
      this._socket.on(channel, callback);
    }
  };
  
  return Changelly;
})();
