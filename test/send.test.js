/**
 * Created by dengwei on 8/8/15.
 */
var should = require('should');
var SMS = require("../index");

var config = {
  company: 'finPortfolio',
  enableFirewall: false
};

var sms = new SMS(config);
describe("test send and verify the message !", function () {

  it("check the send message !", function (done) {
    sms.sendMessage("18680493001" , 'upp', function (err, result) {
      console.log(result);
      should.not.exist(err);
      //result.code.should.be.equal(0);
      done();
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