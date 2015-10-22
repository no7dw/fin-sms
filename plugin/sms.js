
var defend = require('../lib/defend');
var pattern = require('../lib/pattern');
var async = require('async');
//var messagePlugin = require('./luosimao');
//var config = require('../config').config.luosimao;

var messagePlugin = require('./maixuntong');
var config = require('../config').config.maixuntong;


var messageSender = new messagePlugin(config);

console.log('messagePlugin', messageSender);


function sms(config) {
  this.config = config;
};

sms.prototype.send = function (ip, phone, action, callback) {
  //var ip = '127.0.0.1';
  var self = this;
  var message = pattern.capcha();
  console.log("sms sendMessage " , this.config, message);
  async.waterfall([
    function (cb) {
      if (self.config.enableFirewall)
        defend.filter(ip, phone, action, cb);
      else
        cb(null);
    },
    function(cb){
      console.log('messageSender', messageSender);
      messageSender.send(phone, message, cb);
    }
  ], function (err, result) {
    console.log('done', 'err', err, 'result', result);
    callback(null, null);
  });
};

module.exports = sms;