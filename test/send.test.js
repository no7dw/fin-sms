/**
 * Created by dengwei on 8/8/15.
 */
var should = require('should');
var SMS = require("../index");
var ms = require('ms');

var config = {
  company: 'finPortfolio',
  enableFirewall: false
};

var sms = new SMS(config);
describe("test send and verify the message !", function () {
  this.timeout(ms('5s'));
  it("check the send message !", function (done) {
    sms.send("127.0.0.1", "18680493001" , 'hello message', function (err, result) {
      done(err);
    });

  });
  //
  //it("check the send message with wrong number !", function (done) {
  //  var param = {
  //    "phone": "13533978543bb",
  //    "action": "upp"
  //  };
  //  sms.sendMessage(param ,function (err, result) {
  //    console.log(result);
  //    result.code.should.be.equal(1);
  //    done();
  //  });
  //});
})