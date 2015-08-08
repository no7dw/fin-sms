/**
 * Created by dengwei on 8/8/15.
 */
//defend = require('./defend');
//luoSiMao = require('./luosimao');
//var Plugin = require('./plugin');
//var maiXunTong = new Plugin('maixutong');

var MaiXunTong = require('./maixuntong');
var mxtConfig = {};
var maiXunTongObj = new MaiXunTong(mxtConfig);

module.exports.send = function(phone, message ,callback){
  var phoneForLuoSiMao = /^(133|189|155|177|181)\d{8}$/;
  if(phoneForLuoSiMao.test(phone)){
    console.log('maixuntong');
    maiXunTongObj.send(phone, message,callback);
    callback(null, null);
  }
  else
  {
    console.log('$$ luosimao');
    maiXunTongObj.send(phone, message,callback);
    callback(null, null);
  }
};
