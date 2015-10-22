var querystring = require('querystring');
var request = require('superagent');

function luoSiMao(config) {
  this.config = config;
  //config.key
};

luoSiMao.prototype.send = function (phone, message, cb) {
  var postData = {
    agent: false,
    rejectUnauthorized: false,
    mobile: phone,
    message: message
  };
  var MESSAGE_HOST = 'https://sms-api.luosimao.com';
  var key = this.config.key;
  var content = querystring.stringify(postData);

  console.log("==============### luosimao ###==============");
  console.log(MESSAGE_HOST, key, phone, message, content);

  request.post(MESSAGE_HOST + '/v1/send.json')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Content-Length', content.length)
    .auth('api', key)
    .send(content)
    .end(function (err, res) {
      if (!err && /ok/.test(res.text)) {
        console.log('============================send message success=============================');
        cb();
      } else {
        console.log('send message fail');
        cb({msg:err || 'send message fail'});
      }

    });
};
module.exports = luoSiMao;