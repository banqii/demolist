// $(document).ready(function(){
// 	$("#btn").on("click", function(){
// 		$.get("server.php", {name:$("#namevalue").val()},function(data){
// 			$("#result").text(data);
// 		});
// 	})
// });
 $(document).ready(function(){
	$("#btn").on("click", function(){
		$("#result").text("请求数据中，请稍后。。。");
		$.post("server.php", {name:$("#namevalue").val()},function(data){
			alert("ll");
			$("#result").text(data);
		}).error(function(){
			$("#result").text("通信有问题");
		});
	});
});