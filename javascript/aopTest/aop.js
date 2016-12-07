//面向切面编程
//对函数整体的
//统计一下当前所有的函数 谁用时最长
function test() {
    alert(2);
    return "me test!"
}

Function.prototype.before = function(fn) {
    var __self = this;
    return function() {
        fn(this, arguments);
        //这里的this已经指向调用函数
        return __self.apply(__self, arguments);
    }

}
Function.prototype.after = function(fn) {
    //after 先执行本身this 再执行回调
    var __self = this;
    return function() {
        var result = __self.apply(__self, arguments);
        fn(this, arguments);
        return result;
    }

}
    //如果之前的函数里不加return函数，默认函数就会
    //被执行两遍 test作为中转。
    //
    //before的回调和before一起送到after去
    //
    //after和test一起送到before去
    
test.before(function() {
    alert(1);
}).after(function() {
    alert(3);
})();
