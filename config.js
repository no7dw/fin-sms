module.exports = {
  config:  {
    "luosimao":{
      "UserID": "",
      "Account": "",
      "Password": ""
    },
    "maixuntong":{
      "UserID": "",
      "Account": "",
      "Password": ""
    }
  },
  companySign: function () {
    return this.config.company;
  },
  skipList: function () {
    return ["13800138000", "13800138001", "13800138002", "13800138003", "13800138004", "13800138005", "13800138006", "13800138007", "13800138008", "13800138009"]
  },
}