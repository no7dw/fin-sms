/**
 * Created by dengwei on 8/8/15.
 */

function Plugins(pluginName) {
  this.pluginName = pluginName;
  if (this.pluginName == null) {
    this.pluginName = 'maixuntong';//null then use default
  }
  var pluginObj = require("./" + this.pluginName);
  this.plugin = new pluginObj({});
  console.log('init plugins', pluginName, this.plugin);
}

Plugins.prototype.sendMessage = function (phone, message, callback) {
  console.log('use plugin', this.pluginName);
  this.plugin.send(phone, message, callback);
};

//Plugins.prototype.send = function () {
//  return this.plugin.send.apply(this.plugin, arguments);
//};


module.exports = Plugins;