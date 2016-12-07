define(function(require, exports, module) {

  // // 通过 require 引入依赖
  // var $ = require('jquery');
  // var Spinning = require('./spinning');

  // 通过 exports 对外提供接口
  var a = {};
  a.doSomething = function(){
  	console.log("my ok");
  }
  a.doSomething2 = function(){
  	console.log("my2 ok");
  }
  // // 或者通过 module.exports 提供整个接口
  module.exports = a;

});