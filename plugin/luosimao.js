
function luoSiMao(config){
  this.config = config;
  //config.key
};

luoSiMao.prototype.send=function(cb){
  var postData = {
    agent: false,
    rejectUnauthorized: false,
    mobile: phone,
    message: message
  };
  var MESSAGE_HOST = 'https://sms-api.luosimao.com';
  var key = this.config.key;
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
      }
    });
  };
  exports = luoSiMao;