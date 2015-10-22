var querystring = require('querystring');
var request = require('superagent');
var _ = require('underscore');

var mxtConfig = {
  "UserID": "",
  "Account": "",
  "Password": ""
};

MaiXunTong = (function() {
  function MaiXunTong(config) {
    //麦讯通请求url前缀
    this.urlPre = 'http://www.mxtong.net.cn/GateWay/Services.asmx/DirectSend?';
    this.config = config || mxtConfig;
  };
  MaiXunTong.prototype.send = function (phone, message, cb) {
    console.log('### send', phone, message);
    var self = this;

    //麦讯通请求url参数
    var urlObject = {
      "UserID": this.config.UserID,
      "Account": this.config.Account,
      "Password":this.config.Password,
      "Phones": phone + ';', //分号不能省略
      "Content": message,
      "SendTime": "",
      "SendType": 1,
      "PostFixNumber" : ""
    };
    var url = self.urlPre + querystring.stringify(urlObject);
    if (process.env.RUN_TEST) {//string
      console.log('### dev env, message not send');
      return cb(null, null);
    }
    request
      .get(url)
      .end(function (err, res) {
        //success res
        /*
         <?xml version="1.0" encoding="utf-8"?>
         <ROOT xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="JobSendedDescription">
         <RetCode>Sucess</RetCode>
         <JobID>171681123</JobID>
         <OKPhoneCounts>1</OKPhoneCounts>
         <StockReduced>1</StockReduced>
         <ErrPhones>;</ErrPhones>
         </ROOT>
        * */
        console.log('send result', res.text);
        var sendResult = /Sucess/.test(res.text);
        if (!err && sendResult) {
          console.log('-------------------------send message success-----------------------------');
        } else {
          //todo : emit an error
          console.log('send message fail');
        }
        cb(err, sendResult);//true //false
      });
  };
  return MaiXunTong;
})();

module.exports =  MaiXunTong;
