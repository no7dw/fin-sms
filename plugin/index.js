/**
 * Created by dengwei on 8/8/15.
 */
//defend = require('./defend');
//luoSiMao = require('./luosimao');
var MaiXunTong = require('./maixuntong');
var maiXunTong = new maiXunTong({});

module.exports.send = function(phone, message ,callback){
  var phoneForLuoSiMao = /^(133|189|155|177|181)\d{8}$/;
  if(phoneForLuoSiMao.test(phone)){
    maiXunTong.send();
    callback(null, null);
  }
  else
  {
    callback(null, null);
  }
};
