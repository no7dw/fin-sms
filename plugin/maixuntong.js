
function maiXunTong(config){
  this.config = config;
};

maixunTong.prototype.send=function(cb){
  if(require('../lib/const').isDevEnv())
  {
    console.log('### dev env, message not send');
    return callback(err, result);
  }
  //电信号码 使用 麦讯通
  if (phoneReg.test(phone) && !isSkipPhoneList(phone) ) {
    //麦讯通请求url前缀
    var urlPre = 'http://www.mxtong.net.cn/GateWay/Services.asmx/DirectSend?';
    //麦讯通请求url参数
    var urlObject = {
      "UserID": "",
      "Account": "",
      "Password": "",
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
};
exports = maiXunTong;