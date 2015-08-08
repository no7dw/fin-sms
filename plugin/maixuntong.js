var querystring = require('querystring');

function maiXunTong(config) {
  //麦讯通请求url前缀
  this.urlPre = 'http://www.mxtong.net.cn/GateWay/Services.asmx/DirectSend?';
  this.config = config;
};

maiXunTong.prototype.send = function (phone, message, cb) {
  var self = this;
  if (true) {
    console.log('### dev env, message not send');
    return callback(null, null);
  }

  //麦讯通请求url参数
  var urlObject = {
    "UserID": "",
    "Account": "",
    "Password": "",
    "Phones": phone + ';', //分号不能省略
    "Content": message,
    "SendTime": "",
    "SendType": 1,
    "PostFixNumber": ""
  };

  request
    .get(self.config.urlPre + querystring.stringify(urlObject))
    .end(function (err, res) {
      console.log('send result', res.text);
      var sendResult = /Sucess/.test(res.text);
      if (!err && sendResult) {
        console.log('-------------------------send message success-----------------------------');
      } else {
        //todo : emit an error
        console.log('send message fail');
      }
      cb(err, sendResult);
    });
};
exports = maiXunTong;