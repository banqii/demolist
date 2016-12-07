function test(num){
	//这里对num这个变量 创建了一个内存的副本
	num+=1;
	return num;
	// obj.age = "20";
	// console.log("inner:",obj);
}

var num = 1;
alert(test(num));//2

// var obj = {
// 	name:"xiaoming"
// }

// test(obj);
// console.log("outer:",obj);