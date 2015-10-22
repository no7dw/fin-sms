var ms = require('ms');
var lsm = require('../plugin/luosimao');
var config = {

};
var sender = new lsm(config);

describe.skip("test luosimao send and verify the message !", function () {
  this.timeout(ms('5s'));
  it("check luosimao send message !", function (done) {
    sender.send('18680493001' , 'hello' , function(err, result){
      done(err);
    });

  })
})