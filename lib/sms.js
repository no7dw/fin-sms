var request = require('superagent');
var querystring = require('querystring');
var pattern = require('../pattern');
var async = require('async');
var messagePlugin = require('../plugin');
console.log('messageplugin', messagePlugin);
function sms(config) {
  this.config = config;
};

sms.prototype.sendMessage = function ( phone, action, callback) {
  var ip = '127.0.0.1';
  var self = this;
  console.log("sendMessage " , this.config);
  var message = pattern.capcha();
  console.log(message);
  async.waterfall([
    function (cb) {
      if (self.config.enableFirewall)
        defend.filter(ip, phone, action, cb);
      else
        cb(null);
    },
    function(cb){
      messagePlugin.send(phone, message, cb);
    }
  ], function (err, result) {
    console.log('done', 'err', err, 'result', result);
    callback(null, null);
  });
};

module.exports = sms;