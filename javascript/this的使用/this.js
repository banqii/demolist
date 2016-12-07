//谁调指向谁 指向window

// m = 100;
// this.m = 100;

// function test(){
// 	alert(this.m);
// }
// window.test();//100


// this.m = 10090;
// var obj = {
// 	m:100,
// 	test:function(){
// 		alert(this.m);
// 		return function(){
// 			alert(this.m);
// 		}
// 	}
// }

// obj.test();//100
// (obj.test())();//1000



// var style = {
// 	color: "green"
// }
// test();
// function test(){
// 	alert(this.style.color);
// }
// document.getElementById("test").onclick = test;


// this.a = 10000;
// function test(){
// 	this.a = 1;
// }

// test.prototype.geta = function(){
// 	return this.a;
// }

// var p = new test;
// console.log(p.geta());



function test(){
	this.a = 1;
}
test.prototype.a = 100;

var p = new test;
console.log(p);
console.log(p.a);