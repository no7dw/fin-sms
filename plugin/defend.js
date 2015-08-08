function defend(){

};
defend.prototype.filter(ip, phone, action, cb){
  var isSkipPhoneList = function (phone) {
    return _.contains(skipphonelist, phone)
  };
  if(isSkipPhoneList)
    return cb(phone + 'is in skip phone list');

  Token.native(function (err, collection) {
    if (err) {
      cb(err);
    } else {
      collection.SETEX(action + phone, ttl, code, function (err, result) {
        sails.log.verbose("phone action : "+action+" phone : "+phone) ;
        sails.log.verbose("phone code : "+result) ;
        if (!err && /OK/.test(result)) {
          cb(null,code);
        } else {
          cb(err||'code verify fail!');
        }
      });
    }
  });
};
defend.prototype.checkTooMuch(ip, phone, action, callback){
  if(_.contains(skipIp.denylist, clientIP)){
    sails.log.debug('$$$ 请求过于频繁!' ,clientIP, phone);
    return res.json(403, {data:"请求过于频繁"});
  }

  async.waterfall([
    function (cb) {
      Token.native(function (err, collection) {
        if (err) {
          cb(err);
        } else {
          collection.GET(clientIP, function (err, data) {
            cb(err, data);
          });
        }
      });
    },
    function (count, cb) {
      sails.log.debug('sendMessage', count);
      if (!count) {
        Token.native(function (err, collection) {
          if (err) {
            cb(err);
          } else {
            collection.SETEX(clientIP, 86400, '0', function (err, data) {
              sails.log.debug("message: SETEX ", clientIP, data);
              cb(err, data);
            });
          }
        });
      } else {
        Token.native(function (err, collection) {
          if (err) {
            cb(err);
          } else {
            collection.INCR(clientIP, function (err, data) {
              sails.log.debug("message: INCR ", clientIP, data);
              cb(err, data);
            });
          }
        });
      }
    },
    function (status, cb) {
      sails.log.debug('sendMessage', status);
      Token.native(function (err, collection) {
        if (err) {
          cb(err);
        } else {
          collection.GET(clientIP, function (err, data) {
            cb(err, data);
          });
        }
      });
    }
  ], function (err, result) {
    sails.log.debug('$$$ sendMessage result ', clientIP, phone, result, "err", err);
    callback(err, result);
  });
};
module.exports = defend;