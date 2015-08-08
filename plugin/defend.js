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
}