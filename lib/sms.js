
var defend = require('./defend');
var pattern = require('./pattern');
var async = require('async');
var messagePlugin = require('../plugin');
var messageSender = new messagePlugin('luosimao');
console.log('messagePlugin', messageSender);
//var messagePlugin = new require('../plugin')('maixuntong');

function sms(config) {
  this.config = config;
};

sms.prototype.sendMessage = function (ip, phone, action, callback) {
  //var ip = '127.0.0.1';
  var self = this;
  var message = pattern.capcha();
  console.log("sendMessage " , this.config, message);
  async.waterfall([
    function (cb) {
      if (self.config.enableFirewall)
        defend.filter(ip, phone, action, cb);
      else
        cb(null);
    },
    function(cb){
      console.log('messageSender', messageSender);
      messageSender.sendMessage(phone, message, cb);
    }
  ], function (err, result) {
    console.log('done', 'err', err, 'result', result);
    callback(null, null);
  });
};

module.exports = sms;