
var request = require('superagent');
var querystring = require('querystring');
var skipphonelist = require("../data/skipphonelist").skiplist;
var Const = require('../lib/const') ;
var moment = require('moment');
var pattern = require('../pattern');
isSkipPhoneList = function (phone) {
  return _.contains(skipphonelist, phone)
}

module.exports.issueMessage = function(phone,action,callback) {
  sails.log.verbose("sendMessage") ;
  //判断是不是电信号码
  var phoneReg = /^(133|189|155|177|181)\d{8}$/;
  var ttl = 90;
  var code = "";


  var message = pattern.capcha();
  console.log(message);
  async.waterfall([

    function (cb) {
      Token.native(function (err, collection) {
        if (err) {
          cb(err);
        } else {
          collection.SETEX(action + phone, ttl, code, function (err, result) {
            sails.log.verbose("phone action : "+action+" phone : "+phone) ;
            sails.log.verbose("phone code : "+result) ;
            if (!err && /OK/.test(result)) {
              cb(null,code);
            } else {
              cb(err||'code verify fail!');
            }
          });
        }
      });
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


module.exports.verifyMessage = function(phone,action,code, callback) {
  Token.native(function(err,collection){
    if(err){
      callback(err);
    }else{
      collection.GET(action+phone,function(err,data){
        sails.log.verbose("data : "+data) ;
        if(!err && (data == code)){
          callback(null,true);
        }else{
          callback(err,false);
        }
      });
    }
  });
};


/**
 * 发送短信接口
 * @param phones
 * @param message
 */
module.exports.sendMessage = function(phones,message,callback) {
  // var MESSAGE_HOST = 'https://sms-api.luosimao.com';
  // var key = 'key-e2f904af916ebed2395509682215a5f2';
  var phoneReg = /^(133|189|155|177|181)\d{8}$/;
  async.forEachSeries(phones,function(phone,cb){
    if(phoneReg.test(phone) && !isSkipPhoneList(phone) ) {
      //麦讯通请求url前缀
      var urlPre = 'http://www.mxtong.net.cn/GateWay/Services.asmx/DirectSend?';
      //麦讯通请求url参数
      var urlObject = {
        "UserID": "966523",
        "Account": "admin",
        "Password": "ZC825N",
        "Phones": phone + ';', //分号不能省略
        "Content": message,
        "SendTime": "",
        "SendType": 1,
        "PostFixNumber" : ""
      };
      request
        .get(urlPre + querystring.stringify(urlObject))
        .end(function(err, res) {
          if (!err && /Sucess/.test(res.text)) {
            sails.log.info('-------------------------send message success-----------------------------');
          } else {
            sails.log.error('send message fail');
          }
        });
    }
    else if(!isSkipPhoneList(phone)) {// 使用 luosimao
      var postData = {
        agent: false,
        rejectUnauthorized: false,
        mobile: phone,
        message: message
      };
      var MESSAGE_HOST = 'https://sms-api.luosimao.com';
      var key = 'key-e2f904af916ebed2395509682215a5f2';
      var content = querystring.stringify(postData);

      request.post(MESSAGE_HOST + '/v1/send.json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Length', content.length)
        .auth('api', key)
        .send(content)
        .end(function (err, res) {
          if (!err && /ok/.test(res.text)) {
            sails.log.info('============================send message success=============================');
          } else {
            sails.log.error('send message fail');
            sails.log.error('send message err:',err);
            sails.log.error('send message callback:',res.text);
          }
        });
    }

  },function(err){
    callback(err);
  });
};

