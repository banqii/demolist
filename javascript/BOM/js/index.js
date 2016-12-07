// var a = 1;
// console.log(window.location);

var p = {
	me:function(msg1,msg2){
		alert(msg1+msg2);
	}
};
function test(){}
p.me.apply(test,["2","jinqingguo"] ); 