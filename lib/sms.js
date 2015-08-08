
var request = require('superagent');
var querystring = require('querystring');
var skipphonelist = require("../data/skipphonelist").skiplist;
var Const = require('../lib/const') ;
var moment = require('moment');
var pattern = require('../pattern');


module.exports.issueMessage = function(ip ,phone, action,callback) {
  sails.log.verbose("sendMessage") ;
  //判断是不是电信号码
  var phoneReg = /^(133|189|155|177|181)\d{8}$/;
  var ttl = 90;
  var code = "";


  var message = pattern.capcha();
  console.log(message);
  async.waterfall([

    function (cb) {
      if(config.enableFirewall)
        defend.filter(ip,phone,action,cb);
    }
  ], function (err, result) {
      //should more like
      //sms.send(message)
      require('../plugin').maiXuntong.send(message ,cb);

    }
    else if(!isSkipPhoneList(phone)) // 使用 luosimao
    {
      require('../plugin').luoSiMao.send(message, cb );

    }

    callback(err, result);
  });
};
