function hoverView(){$(".contentinner_left_inner li img").each(function(){$(this).click(function(){$(".contentinner_right img").attr("src",$(this).attr("src")),localStorage.skinPath=$(this).attr("src"),$("body").css("background-image","url("+localStorage.skinPath+")")}),$(this).hover(function(){$(".contentinner_right img").attr("src",$(this).attr("src"))},function(){$(".contentinner_right img").attr("src",localStorage.skinPath)})})}function loginFun(){ifLogin=!0,$("header nav").css("margin","5px 0 5px 0"),$(".content input:focus").css("border-color","#999"),$("header nav>a, .weather p, header nav span>span").css("color","#fff"),$(".navskin a").css("color","#fff"),$(".logo1").css("opacity","0"),$(".logo2").css("opacity","1"),$(".content button").css({background:"#E9E9E9",border:"1px solid #E9E9E9",color:"#000"}),$(".content").css({height:"290px","min-height":"290px"}),$(".content input").css("border-right","1px solid rgb(209, 208, 208)"),$(".footposition").css("bottom","none"),$(".tdcode").css("display","none"),$("nav .navskin").css("display","block"),$("body").css({"background-image":"url(image/skin/634.jpg)"}),$(".morep").hover(function(){$(".morediv").css("height",window.innerHeight+19)}),$(".center_news").addClass("conter_news_show"),$(".loginm").removeClass("loginm")}$(document).ready(function(){function n(){$("<div>").addClass("testdiv").appendTo($(".tab_focus2"))}function o(){$(".wrapper").scroll(function(){var o=$(this).height(),i=$(this).get(0).scrollHeight,t=$(this).scrollTop();50>=i-o-t&&($(".main_buttom").addClass("main_buttom_hidden"),$(".tab_focus2").addClass("scroll_focrse"),n())})}function i(){document.addEventListener&&document.addEventListener("DOMMouseScroll",c,!1),window.onmousewheel=document.onmousewheel=c}var t=!1;$(".morep").hover(function(){$(".morediv").css("height",window.innerHeight-1)}),$(".inner_login").click(function(){return loginFun(),i(),$("body").css("background-image","url("+localStorage.skinPath+")"),$("div.hint").addClass("hint_hidden").removeClass("hint"),!1}),$(".logout").click(function(){window.location="baidu.html"});var e=["611.jpg","634.jpg","766.jpg","611.jpg","634.jpg","766.jpg","611.jpg","634.jpg","766.jpg","611.jpg","634.jpg","766.jpg","611.jpg","634.jpg","766.jpg","611.jpg","634.jpg","766.jpg"],s="image/skin/";$(".change_skin").on("click",function(){for(var n=0;18>n;n++){var o=$("<li>").appendTo(".skin_focus2");$("<img>").attr("src",s+e[n]).appendTo(o)}return hoverView(),$(".change_skin_box").animate({top:0,opacity:1},500),!1}),$(".change_skin_hidden").on("click",function(){$(".change_skin_box").animate({top:"-300px",opacity:0},500)}),$(".wrapper").on("click",function(){$(".change_skin_box").animate({top:"-300px",opacity:0},500)}),$(".change_skin_box").on("click",function(n){n.stopPropagation()}),$(".change_skin_box_topinner ul li").each(function(n){$(this).on("click",function(){$(".change_skin_box_topinner ul li.skin_focus1").removeClass("skin_focus1"),$(this).addClass("skin_focus1"),$(".contentinner_left ul.skin_focus2").removeClass("skin_focus2"),$(".contentinner_left ul").eq(n).addClass("skin_focus2");for(var o=0;18>o;o++){{var i=$("<li>").appendTo(".skin_focus2");$("<img>").attr("src",s+e[o]).appendTo(i)}hoverView()}})}),localStorage.skinPath?$(".contentinner_right img").attr("src",localStorage.skinPath):(localStorage.skinPath=s+e[0],$(".contentinner_right img").attr("src",localStorage.skinPath)),t&&$("body").css("background-image","url("+localStorage.skinPath+")"),$(window).on("resize",function(){window.innerWidth<800&&1==t&&$(".center_news").css("display","none"),window.innerWidth>800&&1==t&&$(".center_news").css("display","block")}),$(".main_top span").each(function(n){$(this).on("click",function(){$(this).addClass("tab_focus1").siblings().removeClass("tab_focus1"),$(".main_content>div").eq(n).addClass("tab_focus2").siblings().removeClass("tab_focus2")})});var c=function(n){ee=n||window.event,n.wheelDelta?(n.wheelDelta>0,n.wheelDelta<0&&(console.log("滑轮向下滚动"),o())):n.detail&&(n.detail>0,n.detail<0&&(console.log("滑轮向下滚动"),o()))}});