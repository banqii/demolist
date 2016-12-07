$(function(){
	var i = 0;
	//建立websocket连接
	var socket = io.connect("http://localhost:3000");
	//收到server的连接确认
	socket.on("open", function(){
		console.log("已连接！");
		socket.send("连接成功！");
	});
	//监听massage事件，打印消息信息
	socket.on("message", function(json){
		console.log("massage", json);
	});
});