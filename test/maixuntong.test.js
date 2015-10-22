var ms = require('ms');
var mxt = require('../plugin/maixuntong');

var config = require('../config').config.maixuntong;

var sender = new mxt(config);

describe("test maixuntong send and verify the message !", function () {
  this.timeout(ms('5s'));
  it("check maixuntong send message !", function (done) {
    sender.send('18680493001' , 'hello by maixuntong' , function(err, result){
      done(err);
    });
  })
})