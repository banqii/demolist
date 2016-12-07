 $(document).ready(function(){
 	$("body").text("wait。。。");alert("ll");
	$("body").load("box.htm",function(a,statue,c){
		console.log(statue);
		
		if (statue == "error") {
			$("body").text("片段加载失败");
		}
	});	

	$.getScript("js/hello.js").complete(function(){
		sayHello();
	});
});