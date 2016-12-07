//js是函数级作用域 在内部的变量能访问 外部不能访问内部的 内部能访问外部的
//闭包可以拿到函数内的参数
// var j;
// test();
// j=1000;

// function test(){
// 	if (false) {
// 		var i = 10;
// 	}else{
// 		var t = 100;
// 	};
// 	console.log(j);
// }

// var j = 100;
// ~function test(){
// 	console.log(j);
// }();

function test(){
	var j =1000;
	return function(){
		return j;
	}
}
var a = test()();
console.log(a);