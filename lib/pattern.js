module.exports = {

  capcha: function () {
    var code = "";
    for (var i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10);
    }

    var message = '你的验证码是：' + code + '，请在90秒内输入，不要把验证码泄露给任何人。如非本人操作，可不用理会！';
    return message;
  }
}