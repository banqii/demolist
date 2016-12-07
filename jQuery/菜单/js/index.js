$(document).ready(function(){
	$(".main>a").click(function(){
		var ulNode = $(this).next("ul");
		// if (ulNode.css("display")=="none") {
		// 	ulNode.css("display","block");
		// }else{
		// 	ulNode.css("display","none");
		// }
		// ulNode.toggle(500);//数字、slow、normal、fast
		ulNode.slideToggle();
	});
	$(".hmain").hover(function(){
		$(this).children("ul").slideDown();
	},function(){
		$(this).children("ul").slideUp();
	});
});